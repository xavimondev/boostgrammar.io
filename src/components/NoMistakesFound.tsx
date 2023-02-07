import { CheckCircleIc } from './Icons'

export function NoMistakesFound() {
  return (
    <div class='flex flex-col items-center gap-6 h-full w-full mt-6'>
      <CheckCircleIc class='text-green-400 w-24 h-24 sm:w-28 sm:h-28' />
      <span class='font-bold text-base sm:text-xl text-white'>No mistakes found</span>
      <p class='text-sm sm:text-base text-gray-400 max-w-sm text-center'>
        Boostgrammar.io ran dozens of checks on your text and found no writing issues.
      </p>
    </div>
  )
}
