import { GrammarFix } from './GrammarFix'
import { BackIc } from './Icons'

export function DocumentGenerator() {
  return (
    <>
      <div class='flex flex-col sticky sm:relative top-0'>
        <nav class='px-5 md:px-12 bg-gray-900'>
          <div class='flex h-16 items-center justify-between'>
            <a class='text-xl text-white flex items-center gap-1' href='/dashboard'>
              <BackIc />
              <span class='text-base hidden sm:block font-semibold'>All Documents</span>
            </a>
            <div class='flex flex-row justify-center items-center gap-6'>
              <button
                id='save'
                class='rounded-full py-2 px-0.5 text-white text-sm bg-gradient-to-r from-[#7debf2] to-[#60a4ff]'
              >
                <span class='py-2 px-7 rounded-full bg-[#0d1117]'>Save</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
      <main class='bg-[#0d1117] px-5 md:px-12 pt-10 h-screen fixed w-full'>
        <GrammarFix />
      </main>
    </>
  )
}
