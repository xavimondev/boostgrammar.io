type MistakesList = {
  mistakesList: any
}

export function MistakesList({ mistakesList }: MistakesList) {
  return (
    <div className='flex flex-col gap-4'>
      {mistakesList.map(({ message, categoryIssue, wrongWord, correctionsList }) => (
        <MistakeCard
          categoryIssue={categoryIssue}
          messageIssue={message}
          wrongWord={wrongWord}
          rightWord={correctionsList.at(0)}
        />
      ))}
    </div>
  )
}
type MistakeCard = {
  categoryIssue: string
  messageIssue: string
  wrongWord: string
  rightWord: string
}

export function MistakeCard({ categoryIssue, messageIssue, wrongWord, rightWord }: MistakeCard) {
  return (
    <div class='flex flex-col gap-3 rounded-lg bg-white'>
      <div class='p-4 flex flex-col gap-4'>
        <span class='text-gray-400 uppercase text-sm'>{categoryIssue}</span>
        <div class='flex flex-row gap-7 items-center'>
          <span class='text-sm sm:text-lg line-through decoration-red-400 after:content-["→"] after:align-middle after:ml-4 after:text-gray-600 after:inline-block'>
            {wrongWord}
          </span>
          <div class='flex flex-row gap-1'>
            <button class='text-sm sm:text-base font-bold py-1 px-2 sm:px-4 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-100'>
              {rightWord}
            </button>
          </div>
        </div>
        <p class='font-semibold text-base sm:text-base'>{messageIssue}</p>
      </div>
    </div>
  )
}
