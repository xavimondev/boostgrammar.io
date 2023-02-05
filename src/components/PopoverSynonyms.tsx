export function PopoverSynonyms({ coordinates, popoverRef, children }) {
  const { top = 0, left = 0 } = coordinates
  return (
    <div
      ref={popoverRef}
      class={`absolute z-10 bg-white rounded-lg w-80 lg:w-96 max-w-sm animate-from-top`}
      style={{
        top: `${top}px`,
        left: `${left}px`
      }}
    >
      <div class='overflow-hidden shadow-lg p-4'>
        <div class='flex flex-col gap-4'>
          <span class='text-sm font-semibold text-gray-400'>Synonyms</span>
          <div className='flex flex-wrap gap-2'>{children}</div>
        </div>
      </div>
    </div>
  )
}
