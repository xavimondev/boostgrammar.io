import { useRef } from 'preact/hooks'
import { signal, computed } from '@preact/signals'
import { copyTextToClipboard } from '@utils/copyClipboard'
import { notify } from '@utils/toast'
import { transformStringArrayToString } from '@utils/arrayToString'
import { getGrammaticalMistakesFromText } from '@services/grammar'
import { useOnClickOutside } from 'src/hooks/useOnClickOutSide'
import { Mistake, PopoverCoordinates } from '../types'
import { UserInput } from './UserInput'
import { WaitingData } from './WaitingData'
import { WordOutput } from './WordOutput'
import { CopyToClipboardIc } from './Icons'
import { FunFactsEnglish } from './FunFactsEnglish'
import { PopoverSynonyms } from './PopoverSynonyms'
import { SynonymsList, SynonymsLoader } from './Synonyms'
import { IndicatorsList } from './IndicatorsList'
import { HighlightResult } from './HighlightResults'
import { MistakesList } from './MistakesList'
import { ResultsPanel } from './ResultsPanel'

const synonyms = signal<string[]>([])
const wordSelected = signal<string>('')
const isLoadingSynonyms = signal<boolean>(false)
const isLoading = signal(false)
const popoverCoordinates = signal<PopoverCoordinates>({
  top: 0,
  left: 0
})

const isOpen = signal<boolean>(false)
const totalWords = signal<number>(0)
const mistakesList = signal<Mistake[]>([])
const wordsFromEnteredText = signal<string[]>([])
const wrongWordsFromEnteredText = signal<string[]>([])
const outputValue = signal<string>('')
// When `outputValue` changes, this re-runs automatically:
const outputValueAsArray = computed(() => {
  return outputValue.value.length === 0 ? [] : outputValue.value.split(' ')
})

type GrammarFixProps = {
  documentValues: any
  isReadyToSave: any
}

export function GrammarFix({ documentValues, isReadyToSave }: GrammarFixProps) {
  const popoverRef = useRef<HTMLDivElement>(undefined)
  const titleRef = useRef<HTMLInputElement>(undefined)

  const setLoading = (isLoadingValue: boolean) => (isLoading.value = isLoadingValue)
  const hasResults = outputValue.value !== ''

  useOnClickOutside(popoverRef, () => {
    isOpen.value = false
  })

  const setDocumentValues = () => {
    const title = titleRef.current.value || 'Untitled document'
    const userInput = transformStringArrayToString(wordsFromEnteredText.value)
    const grammarOutput = 'is a normal grammar oouput'

    const totalWords = wordsFromEnteredText.value.length
    const totalMistakes = wrongWordsFromEnteredText.value.length

    const doc = {
      title,
      userInput,
      grammarOutput,
      totalWords,
      totalMistakes
    }

    documentValues.value = doc
    isReadyToSave.value = true
  }

  const getMistakesFromText = async (text: string) => {
    // 'Some people does not wanna to eat meals'
    const { result, wrongWordsList } = await getGrammaticalMistakesFromText(text)
    mistakesList.value = result
    wordsFromEnteredText.value = text.split(' ')
    wrongWordsFromEnteredText.value = wrongWordsList
    setDocumentValues()
  }

  return (
    <>
      <div class='flex flex-col md:flex-row gap-8 sm:gap-4 w-full h-full'>
        <div class='flex flex-col h-full w-full'>
          <div class='mb-10'>
            <input
              ref={titleRef}
              id='documentTitle'
              type='text'
              class='bg-[#0d1117] font-bold text-base border-none focus:outline-none text-white w-full'
              placeholder='Change document name'
              autofocus
            />
          </div>
          <div class='flex flex-col gap-2 h-full w-full'>
            <div class='h-1/2'>
              <UserInput
                setOutputValue={(output: string) => (outputValue.value = output)}
                setLoading={setLoading}
                setTotalWords={(total: number) => (totalWords.value = total)}
                getTotalMistakes={(text: string) => getMistakesFromText(text)}
              />
            </div>
            <div class='flex flex-col gap-2 h-1/2 w-full relative'>
              <div class='flex flex-row justify-between w-full'>
                <span class='font-bold text-white text-lg sm:text-xl'>Output</span>
                <button
                  disabled={!hasResults}
                  onClick={async () => {
                    await copyTextToClipboard(outputValue.value)
                    notify('success', 'Text copied')
                  }}
                >
                  <CopyToClipboardIc
                    class={`h-8 w-8 ${hasResults ? 'text-white' : 'text-gray-500'} items-center`}
                  />
                </button>
              </div>
              {hasResults ? (
                <div class='flex gap-1 flex-wrap overflow-y-auto w-fu'>
                  {outputValueAsArray.value.map((word) => (
                    <WordOutput
                      word={word}
                      synonyms={synonyms}
                      setWordSelected={(word: string) => (wordSelected.value = word)}
                      setIsLoadingSynonyms={() =>
                        (isLoadingSynonyms.value = !isLoadingSynonyms.value)
                      }
                      setPopoverCoordinates={(coordinates: PopoverCoordinates) => {
                        popoverCoordinates.value = coordinates
                      }}
                      openPopover={() => (isOpen.value = true)}
                    />
                  ))}
                </div>
              ) : null}
              {!isLoading.value && !hasResults && <WaitingData />}
              {isLoading.value && <FunFactsEnglish />}
              {isOpen.value && (
                <PopoverSynonyms coordinates={popoverCoordinates.value} popoverRef={popoverRef}>
                  <SynonymsList synonyms={synonyms.value} />
                  {isLoadingSynonyms.value && <SynonymsLoader />}
                  {/* If word does not have synonyms, we show this message */}
                  {!isLoadingSynonyms.value &&
                  synonyms.value.length === 0 &&
                  wordSelected.value !== '' ? (
                    <p class='text-black text-sm sm:text-base'>
                      No synonyms for <span class='font-extrabold'>{wordSelected.value}</span> found
                    </p>
                  ) : null}
                </PopoverSynonyms>
              )}
            </div>
          </div>
        </div>
        {/* Text animation typing saying something like: Here are your mistakes */}
        {/* If user does not have mistakes, app will show an animation with check icon saying everything is ok */}
        <ResultsPanel>
          <IndicatorsList
            totalCharacters={totalWords}
            totalWords={wordsFromEnteredText.value.length}
            totalMistakes={wrongWordsFromEnteredText.value.length}
          />
          {wordsFromEnteredText.value.length > 0 ? (
            <HighlightResult
              wordsFromEnteredText={wordsFromEnteredText.value}
              wrongWordsFromEnteredText={wrongWordsFromEnteredText.value}
            />
          ) : null}
          <MistakesList mistakesList={mistakesList.value} />
        </ResultsPanel>
      </div>
    </>
  )
}
