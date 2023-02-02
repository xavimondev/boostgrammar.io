import { useState } from 'preact/hooks'
import { signal } from '@preact/signals'
import { copyTextToClipboard } from '@utils/copyClipboard'
import { notify } from '@utils/toast'
import { UserInput } from './UserInput'
import { WaitingData } from './WaitingData'
import { WordOutput } from './WordOutput'
import { CopyToClipboardIc } from './Icons'

const synonyms = signal<string[]>([])
const wordSelected = signal<string>('')
const isLoadingSynonyms = signal<boolean>(false)

const transformStringArrayToString = (arrayString: string[]) => {
  return arrayString.join(' ').trim()
}

export function GrammarFix({ isLoading, totalWords }) {
  const [outputValue, setOutputValue] = useState<string[]>([])
  const setLoading = (isLoadingValue: boolean) => (isLoading.value = isLoadingValue)
  const hasResults = outputValue.length > 0
  return (
    <>
      <div class='grid grid-cols-1 md:grid-cols-2 h-full'>
        <div class='w-full flex flex-col'>
          <div class='mb-10'>
            <input
              id='documentTitle'
              type='text'
              class='bg-[#0d1117] font-bold sm:text-lg border-none focus:outline-none text-white w-full'
              placeholder='Change document name'
              autofocus
            />
          </div>
          <div class='h-full'>
            <UserInput
              updateOutputValue={setOutputValue}
              setLoading={setLoading}
              totalWords={totalWords}
            />
          </div>
        </div>
        <aside class='w-full'>
          <div class='flex flex-col h-full gap-4'>
            <div class='flex flex-row justify-between'>
              <span class='font-bold text-white text-base sm:text-lg'>Suggestions</span>
              <button
                disabled={!hasResults}
                onClick={async () => {
                  const text = transformStringArrayToString(outputValue)
                  await copyTextToClipboard(text)
                  notify('Text copied')
                }}
              >
                <CopyToClipboardIc
                  class={`h-8 w-8 ${hasResults ? 'text-white' : 'text-gray-500'} items-center`}
                />
              </button>
            </div>
            <div class='h-3/5 overflow-y-auto'>
              {hasResults ? (
                <div class='flex gap-1 flex-wrap'>
                  {outputValue.map((word) => (
                    <WordOutput
                      word={word}
                      synonyms={synonyms}
                      wordSelected={wordSelected}
                      isLoadingSynonyms={isLoadingSynonyms}
                    />
                  ))}
                </div>
              ) : (
                <WaitingData />
              )}
            </div>
            <div class='h-2/5 flex flex-col gap-4'>
              <span class='font-bold text-white text-base sm:text-lg'>Synonyms</span>
              <div class='flex flex-wrap gap-3'>
                {/* TODO: Add component synonyms */}
                {synonyms.value.length > 0 ? (
                  <>
                    {synonyms.value.map((syn: string) => (
                      <button class='text-sm sm:text-base py-1 sm:py-1.5 px-6 sm:px-8 text-white rounded-full font-semibold transition ease-in-out delay-75 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300'>
                        {syn}
                      </button>
                    ))}
                  </>
                ) : null}
                {/* TODO: Add component while is rendering */}
                {!isLoadingSynonyms.value &&
                synonyms.value.length === 0 &&
                wordSelected.value !== '' ? (
                  <p class='text-gray-400 text-sm sm:text-base'>
                    No synonyms for <span class='font-bold'>to</span> found
                  </p>
                ) : null}

                {wordSelected.value === '' && (
                  <span class='text-gray-400 text-base sm:text-lg'>
                    Select a word to see its <span class='font-bold'>synonyms</span>
                  </span>
                )}
                {isLoadingSynonyms.value && wordSelected.value !== '' && (
                  <p class='text-base sm:text-lg font-bold'>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
