import { useRef, useState } from 'preact/hooks'
import { signal } from '@preact/signals'
import { copyTextToClipboard } from '@utils/copyClipboard'
import { notify } from '@utils/toast'
import { transformStringArrayToString } from '@utils/arrayToString'
import { saveDocument } from '@services/document'
import { getGrammaticalMistakesFromText } from '@services/grammar'
import { useOnClickOutside } from 'src/hooks/useOnClickOutSide'
import { PopoverCoordinates } from '../types'
import { UserInput } from './UserInput'
import { WaitingData } from './WaitingData'
import { WordOutput } from './WordOutput'
import { CopyToClipboardIc } from './Icons'
import { FunFactsEnglish } from './FunFactsEnglish'
import { PopoverSynonyms } from './PopoverSynonyms'
import { SynonymsList, SynonymsLoader } from './Synonyms'
import { IndicatorsList } from './IndicatorsList'
import { HighlightResult } from './HighlightResults'

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
const mistakesList = signal([])
const wordsFromEnteredText = signal<string[]>([])
const wrongWordsFromEnteredText = signal<string[]>([])

export function GrammarFix() {
  const [outputValue, setOutputValue] = useState<string[]>([])
  const popoverRef = useRef<HTMLDivElement>(undefined)
  const titleRef = useRef<HTMLInputElement>(undefined)

  const setLoading = (isLoadingValue: boolean) => (isLoading.value = isLoadingValue)
  const hasResults = outputValue.length > 0

  useOnClickOutside(popoverRef, () => {
    isOpen.value = false
  })

  const getMistakesFromText = async (text: string) => {
    // 'Some people does not wanna to eat meals'
    const { result, wrongWordsList } = await getGrammaticalMistakesFromText(text)
    mistakesList.value = result
    wordsFromEnteredText.value = text.split(' ')
    wrongWordsFromEnteredText.value = wrongWordsList
  }

  const newDocument = async () => {
    const title = titleRef.current.value || 'Untitled document'
    const userInput = transformStringArrayToString(wordsFromEnteredText.value)
    const grammarOutput = transformStringArrayToString(outputValue)

    // if (!validateData(userInput, grammarOutput)) return

    const totalWords = wordsFromEnteredText.value.length
    const totalMistakes = wrongWordsFromEnteredText.value.length

    const doc = {
      title,
      userInput,
      grammarOutput,
      totalWords,
      totalMistakes
    }

    notify('promise', 'Document saved', saveDocument(doc))
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
                updateOutputValue={setOutputValue}
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
                    const text = transformStringArrayToString(outputValue)
                    await copyTextToClipboard(text)
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
                  {outputValue.map((word) => (
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
        <aside class='w-full h-full hidden md:block'>
          <div class='flex flex-col h-full gap-4'>
            <span class='font-bold text-white text-lg sm:text-xl'>Results</span>
            <IndicatorsList
              totalCharacters={totalWords}
              totalWords={wordsFromEnteredText.value.length}
              totalMistakes={wrongWordsFromEnteredText.value.length}
            />
            <div className='flex flex-col gap-4'>
              {/* List mistakes */}
              {mistakesList.value.map(({ message, categoryIssue, wrongWord, correctionsList }) => (
                <div class='flex flex-col gap-3 rounded-lg bg-white'>
                  <div class='p-4 flex flex-col gap-4'>
                    <span class='text-gray-400 uppercase text-sm'>{categoryIssue}</span>
                    <div class='flex flex-row gap-7 items-center'>
                      <span class='text-sm sm:text-lg line-through decoration-red-400 after:content-["→"] after:align-middle after:ml-4 after:text-gray-600 after:inline-block'>
                        {wrongWord}
                      </span>
                      <div class='flex flex-row gap-1'>
                        <button class='text-sm sm:text-base font-bold py-1 px-2 sm:px-4 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-100'>
                          {correctionsList.at(0)}
                        </button>
                      </div>
                    </div>
                    <p class='font-semibold text-base sm:text-base'>{message}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Highlighting incorrect words */}
            {wordsFromEnteredText.value.length > 0 ? (
              <HighlightResult
                wordsFromEnteredText={wordsFromEnteredText.value}
                wrongWordsFromEnteredText={wrongWordsFromEnteredText.value}
              />
            ) : null}

            {/* Text animation typing saying something like: Here are your mistakes */}
            {/* If user does not have mistakes, app will show an animation with check icon saying everything is ok */}
          </div>
        </aside>
      </div>
    </>
  )
}
