import { SearchingIc } from './Icons'

export function WaitingData() {
  return (
    <div class='flex flex-col items-center justify-center'>
      <SearchingIc />
      <div class='mt-1 flex flex-col gap-6 text-center'>
        <span class='font-bold text-xl sm:text-2xl text-white'>Nothing to check yet</span>
        <p class='text-base sm:text-lg text-gray-400'>Start writing to generate feedback.</p>
      </div>
    </div>
  )
}
