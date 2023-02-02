export function BottomBar({ totalWords }) {
  return (
    <div class='fixed bottom-0 z-50 flex justify-center w-full gap-6 p-2 bg-gray-900'>
      <div class='flex flex-row gap-4'>
        <div class='flex flex-col gap-0.5 items-center'>
          <span class='font-bold text-base sm:text-xl text-green-300'>WORDS</span>
          <span class='font-semibold text-sm sm:text-base text-green-300'>{totalWords.value}</span>
        </div>
      </div>
    </div>
  )
}
