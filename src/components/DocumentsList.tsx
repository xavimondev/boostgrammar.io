import { formatDateFromString } from '@utils/formatDate'
import { signal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { getAllDocuments } from '@services/document'
import { Placeholder } from './Placeholder'
import { NoDataFound } from './NoDataFound'

type DocumentItem = {
  id: string
  title: string
  user_input: string
  total_words: number
  total_mistakes: number
  created_at: string
}
function DocumentItem({
  id,
  title,
  user_input,
  total_words,
  total_mistakes,
  created_at
}: DocumentItem) {
  return (
    <div class='rounded-lg p-0.5 shadow bg-gradient-to-r from-[#7debf2] to-[#60a4ff] max-h-full transition hover:scale-105 z-10'>
      <div class='bg-[#0d1117] rounded-lg h-full'>
        <div class='h-full block overflow-hidden'>
          <div class='flex flex-col w-full h-full p-6 justify-between'>
            <span class='mb-2 text-slate-400 text-sm text-right'>
              {formatDateFromString(created_at)}
            </span>
            <span class='font-bold text-white mb-2'>{title}</span>
            <p class='text-gray-200 mb-4 line-clamp-2'>{user_input}</p>
            <div class='flex flex-row border-t-2 border-gray-700 pt-4'>
              <span class='text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-lg bg-green-300 text-green-800'>
                Words: {total_words}
              </span>
              <span class='text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-lg bg-red-300 text-red-800'>
                Mistakes: {total_mistakes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const documentsList = signal([])
const isLoading = signal<boolean>(false)

export function DocumentsList() {
  useEffect(() => {
    isLoading.value = true

    const getDocuments = async () => {
      const { data } = await getAllDocuments()
      documentsList.value = data
      isLoading.value = false
    }

    getDocuments()
  }, [])

  if (isLoading.value) return <Placeholder length={4} />

  return (
    <>
      {documentsList.value.length > 0 ? (
        <div class='grid gap-6 grid-cols-[repeat(auto-fill,minmax(320px,_1fr))]'>
          {documentsList.value.map((document) => (
            <DocumentItem {...document} />
          ))}
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  )
}
