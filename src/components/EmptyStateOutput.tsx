import { ThinkIc } from './Icons'

export function EmptyStateOutput() {
  return (
    <div class='flex flex-col items-center gap-6 h-full w-full mt-6'>
      <ThinkIc class='inline-block w-24 h-24 sm:w-28 sm:h-28' />
      <span class='font-bold text-base sm:text-xl text-white'>Nothing to check yet</span>
      <p class='text-sm sm:text-base text-gray-400'>Start writing to generate feedback.</p>
    </div>
  )
}
