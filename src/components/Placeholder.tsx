type PlaceholderProps = {
  length?: number
}

export function Placeholder({ length }: PlaceholderProps) {
  if (!length) return <PlaceHolderItem />

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center'>
      {Array.from({ length }, (_, index) => index + 1).map((item) => (
        <PlaceHolderItem key={item} />
      ))}
    </div>
  )
}

export function PlaceHolderItem() {
  return (
    <div className='px-6 py-8 max-w-sm rounded-2xl border border-gray-100 shadow animate-pulse dark:border-indigo-200 w-full'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <div className='h-3 w-full bg-gray-200 rounded-full dark:bg-gray-500 mb-4'></div>
        </div>
        <div>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-500 mb-2.5'></div>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-500 mb-2.5'></div>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-500'></div>
        </div>
        <div className='flex flex-row gap-4'>
          <div className='h-2.5 w-14 bg-gray-200 rounded-full dark:bg-gray-500 mb-2'></div>
          <div className='h-2 w-14 bg-gray-200 rounded-full dark:bg-gray-500'></div>
        </div>
      </div>
    </div>
  )
}
