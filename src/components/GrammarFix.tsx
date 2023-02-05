import { useRef, useState } from 'preact/hooks'
import { signal } from '@preact/signals'
import { copyTextToClipboard } from '@utils/copyClipboard'
import { notify } from '@utils/toast'
import { useOnClickOutside } from 'src/hooks/useOnClickOutSide'
import { PopoverCoordinates } from '../types'
import { UserInput } from './UserInput'
import { WaitingData } from './WaitingData'
import { WordOutput } from './WordOutput'
import { CopyToClipboardIc } from './Icons'
import { FunFactsEnglish } from './FunFactsEnglish'
import { PopoverSynonyms } from './PopoverSynonyms'
import { SynonymsList, SynonymsLoader } from './Synonyms'

const synonyms = signal<string[]>([])
const wordSelected = signal<string>('')
const isLoadingSynonyms = signal<boolean>(false)
const isLoading = signal(false)
const popoverCoordinates = signal<PopoverCoordinates>({
  top: 0,
  left: 0
})
const transformStringArrayToString = (arrayString: string[]) => {
  return arrayString.join(' ').trim()
}
const isOpen = signal<boolean>(false)
const totalWords = signal<number>(0)

export function GrammarFix() {
  const [outputValue, setOutputValue] = useState<string[]>([])
  const popoverRef = useRef<HTMLDivElement>(undefined)

  const setLoading = (isLoadingValue: boolean) => (isLoading.value = isLoadingValue)
  const hasResults = outputValue.length > 0

  useOnClickOutside(popoverRef, () => {
    isOpen.value = false
  })

  return (
    <>
      <div class='flex flex-col md:flex-row gap-8 sm:gap-4 w-full h-full'>
        <div class='flex flex-col h-full w-full'>
          <div class='mb-10'>
            <input
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
            {/* Results component */}
            <div class='flex gap-8 justify-center'>
              <div class='flex flex-col gap-0.5 items-center'>
                <span class='font-bold text-base sm:text-4xl text-green-400'>WORDS</span>
                <span class='font-semibold text-sm sm:text-5xl text-green-400'>
                  {totalWords.value}
                </span>
              </div>
              <div class='flex flex-col gap-0.5 items-center'>
                <span class='font-bold text-base sm:text-4xl text-red-400'>MISTAKES</span>
                <span class='font-semibold text-sm sm:text-5xl text-red-400'>
                  {totalWords.value}
                </span>
              </div>
            </div>

            {/* Text animation typing saying something like: Here are your mistakes */}
            {/* I need to show words that are not in ouput and highlight them */}
            {/* If user does not have mistakes, app will show an animation with check icon saying everything is ok */}
          </div>
        </aside>
      </div>
    </>
  )
}
