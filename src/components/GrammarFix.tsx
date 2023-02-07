import { Ref, useRef } from 'preact/hooks'
import { signal } from '@preact/signals'
import { copyTextToClipboard } from '@utils/copyClipboard'
import { notify } from '@utils/toast'
import { useOnClickOutside } from '@hooks/useOnClickOutSide'
import { PopoverCoordinates } from '../types'
import { UserInput } from './UserInput'
import { EmptyStateOutput } from './EmptyStateOutput'
import { WordOutput } from './WordOutput'
import { CopyToClipboardIc } from './Icons'
import { LoaderFunFactsEnglish } from './LoaderFunFactsEnglish'
import { PopoverSynonyms } from './PopoverSynonyms'
import { SynonymsList, SynonymsLoader } from './Synonyms'
import { IndicatorsList } from './IndicatorsList'
import { HighlightResult } from './HighlightResults'
import { MistakesList } from './MistakesList'
import { ResultsPanel, ResultsPanelToolbar } from './ResultsPanel'
import { DialogResult } from './DialogResult'
import { NoMistakesFound } from './NoMistakesFound'

const synonyms = signal<string[]>([])
const wordSelected = signal<string>('')
const isLoadingSynonyms = signal<boolean>(false)
const popoverCoordinates = signal<PopoverCoordinates>({
  top: 0,
  left: 0
})
const isOpen = signal<boolean>(false)

const isDialogOpen = signal<boolean>(false)

type GrammarFixProps = {
  isLoading: any
  totalCharacteres: any
  outputValue: any
  outputValueAsArray: any
  wordsFromEnteredText: any
  wrongWordsFromEnteredText: any
  mistakesList: any
  titleRef: Ref<HTMLInputElement>
  textEnteredRef: Ref<HTMLTextAreaElement>
}

export function GrammarFix({
  isLoading,
  totalCharacteres,
  outputValue,
  outputValueAsArray,
  wordsFromEnteredText,
  wrongWordsFromEnteredText,
  mistakesList,
  titleRef,
  textEnteredRef
}: GrammarFixProps) {
  const popoverRef = useRef<HTMLDivElement>(undefined)

  const hasResults = outputValue.value !== ''

  useOnClickOutside(popoverRef, () => {
    isOpen.value = false
  })

  return (
    <>
      <div class='flex flex-col md:flex-row gap-8 sm:gap-4 w-full h-full relative'>
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
              <UserInput textEnteredRef={textEnteredRef} />
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
                <div class='flex gap-1 flex-wrap overflow-y-auto w-full'>
                  {outputValueAsArray.value.map((word: string) => (
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
              {!isLoading.value && !hasResults && <EmptyStateOutput />}
              {isLoading.value && <LoaderFunFactsEnglish />}
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
        <ResultsPanel>
          <IndicatorsList
            totalCharacters={totalCharacteres.value}
            totalWords={wordsFromEnteredText.value.length}
            totalMistakes={wrongWordsFromEnteredText.value.length}
          />
          {mistakesList.value.length === 0 && wordsFromEnteredText.value.length > 0 ? (
            <NoMistakesFound />
          ) : null}
          {wordsFromEnteredText.value.length > 0 ? (
            <HighlightResult
              wordsFromEnteredText={wordsFromEnteredText.value}
              wrongWordsFromEnteredText={wrongWordsFromEnteredText.value}
            />
          ) : null}
          <MistakesList mistakesList={mistakesList.value} />
        </ResultsPanel>
        <ResultsPanelToolbar onClick={() => (isDialogOpen.value = true)} />
      </div>
      {isDialogOpen.value && (
        <DialogResult hideDialog={() => (isDialogOpen.value = false)}>
          <IndicatorsList
            totalCharacters={totalCharacteres.value}
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
        </DialogResult>
      )}
    </>
  )
}
