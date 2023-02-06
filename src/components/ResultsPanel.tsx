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
