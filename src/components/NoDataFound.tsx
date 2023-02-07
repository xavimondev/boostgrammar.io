import { QuestionIc } from './Icons'

export function NoDataFound() {
  return (
    <div class='flex flex-col items-center gap-6 h-full w-full mt-36 justify-center text-center'>
      <QuestionIc class='text-sky-400 w-24 h-24 sm:w-28 sm:h-28' />
      <span class='font-semibold text-base sm:text-2xl text-white/90'>
        You haven't created documents yet.
      </span>
    </div>
  )
}
