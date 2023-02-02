import { useState } from 'preact/hooks'
import { signal } from '@preact/signals'
import { UserInput } from './UserInput'
import { WaitingData } from './WaitingData'
import { WordOutput } from './WordOutput'

const synonyms = signal<string[]>([])

export function GrammarFix({ isLoading }) {
  const [outputValue, setOutputValue] = useState<string[]>([])
  const setLoading = (isLoadingValue: boolean) => (isLoading.value = isLoadingValue)

  return (
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
          <UserInput updateOutputValue={setOutputValue} setLoading={setLoading} />
        </div>
      </div>
      <aside class='w-full'>
        <div class='flex flex-col h-full gap-4'>
          <span class='font-bold text-white text-base sm:text-lg'>Suggestions</span>
          <div class='h-3/5 overflow-y-auto'>
            {outputValue.length > 0 ? (
              <div class='flex gap-1 flex-wrap'>
                {outputValue.map((word) => (
                  <WordOutput word={word} synonyms={synonyms} />
                ))}
              </div>
            ) : (
              <WaitingData />
            )}
          </div>
          <div class='h-2/5 flex flex-col gap-4'>
            <span class='font-bold text-white text-base sm:text-lg'>Synonyms</span>
            <div class='flex flex-wrap gap-3'>
              {synonyms.value.length > 0 ? (
                <>
                  {synonyms.value.map((syn: string) => (
                    <button class='text-sm sm:text-base py-1 sm:py-1.5 px-6 sm:px-8 text-white rounded-full font-semibold transition ease-in-out delay-75 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300'>
                      {syn}
                    </button>
                  ))}
                </>
              ) : (
                <p>
                  No synonyms for <span class='bold'>to</span> found
                </p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
