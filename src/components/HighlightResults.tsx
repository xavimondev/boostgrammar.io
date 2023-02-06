type HighlightResult = {
  wordsFromEnteredText: string[]
  wrongWordsFromEnteredText: string[]
}

export function HighlightResult({ wordsFromEnteredText, wrongWordsFromEnteredText }) {
  return (
    <div class='flex flex-row gap-1 flex-wrap items-center'>
      {wordsFromEnteredText.map((word) => {
        const isWrong = wrongWordsFromEnteredText.indexOf(word) === -1
        return (
          <div class={`${!isWrong ? 'bg-red-400 rounded-md p-0.5 font-semibold' : ''}`}>
            <span class={`text-sm sm:text-base text-white`}>{word}</span>
          </div>
        )
      })}
    </div>
  )
}
