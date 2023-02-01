import { useState } from 'preact/hooks'
import { UserInput } from './UserInput'
import { WaitingData } from './WaitingData'

export function GrammarFix() {
  const [outputValue, setOutputValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

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
        <div class='flex flex-col h-full'>
          <div class='mb-2 md:mb-10'>
            <span class='font-bold text-white text-base sm:text-lg'>Suggestions</span>
          </div>
          <div class='h-full mb-12 md:mb-8'>
            {loading && <span class='text-white font-semibold text-xl'>Loading results</span>}
            {outputValue ? (
              <p class='text-lg sm:text-xl text-white' id='grammarOutput'>
                {outputValue}
              </p>
            ) : (
              <WaitingData />
            )}
          </div>
          <div class='h-full flex flex-col gap-4'>
            <span class='font-bold text-white text-base sm:text-lg'>Synonyms</span>
            <div class='flex flex-wrap gap-3'>
              <button class='py-1.5 px-8 text-white rounded-full font-semibold transition ease-in-out delay-75 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300'>
                home
              </button>
              <button class='py-1.5 px-8 text-white rounded-full font-semibold transition ease-in-out delay-75 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300'>
                house
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
