export function NoDataFound() {
  return (
    <div class='flex flex-col items-center gap-6 h-full w-full mt-36 justify-center text-center'>
      <img
        src='/nodata.svg'
        alt='There are not documents yet Illustration'
        class='w-52 h-52 sm:w-80 sm:h-80'
      />
      <span class='font-semibold text-base sm:text-2xl text-white max-w-2xl'>
        You haven't created documents yet. You do not need to be authenticated to create a document.
      </span>
    </div>
  )
}
