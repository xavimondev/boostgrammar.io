type HighlightResult = {
  wordsFromEnteredText: string[]
  wrongWordsFromEnteredText: string[]
}

export function HighlightResult({ wordsFromEnteredText, wrongWordsFromEnteredText }) {
  return (
    <div className='bg-white rounded-lg border border-gray-300 md:border-none'>
      <div class='flex flex-row gap-1 flex-wrap items-center py-2 px-3'>
        {wordsFromEnteredText.map((word: string) => {
          const isWrong = wrongWordsFromEnteredText.indexOf(word) !== -1
          return (
            <div
              class={`${
                isWrong ? 'bg-red-400 rounded-md p-0.5 font-semibold text-white' : 'text-black'
              }`}
            >
              <span class={`text-sm sm:text-base`}>{word}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
