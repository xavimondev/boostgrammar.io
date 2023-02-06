export function ResultsPanel({ children }) {
  return (
    <aside class='w-full h-full hidden md:block'>
      <div class='flex flex-col h-full gap-4'>
        <span class='font-bold text-white text-lg sm:text-xl'>Results</span>
        {children}
      </div>
    </aside>
  )
}

export function ResultsPanelToolbar(props) {
  return (
    <button
      class='absolute left-0 right-0 bottom-20 block md:hidden rounded-full bg-gradient-to-r from-[#11ccda] to-[#4490f2] w-1/2 m-auto px-2 py-2.5 text-center animate-bounce'
      {...props}
    >
      <span class='text-white font-semibold'>See Results</span>
    </button>
  )
}
