import { signal } from '@preact/signals'
import { supabase } from 'src/lib/database'
import { saveDocument } from '@services/document'
import { notify } from '@utils/toast'
import { GrammarFix } from './GrammarFix'
import { BackIc } from './Icons'

const initialState = {
  title: '',
  userInput: '',
  grammarOutput: '',
  totalWords: 0,
  totalMistakes: 0
}

const documentValues = signal<any>(initialState)
const isReadyToSave = signal<boolean>(false)

export function DocumentGenerator() {
  const newDocument = async () => {
    const user = await supabase.auth.getUser()
    console.log(user)

    notify('promise', 'Document saved', saveDocument(documentValues.value))

    isReadyToSave.value = false
    documentValues.value = initialState
  }

  return (
    <>
      <div class='flex flex-col sticky sm:relative top-0'>
        <nav class='px-5 md:px-12 bg-gray-900'>
          <div class='flex h-16 items-center justify-between'>
            <a class='text-xl text-white flex items-center gap-1' href='/dashboard'>
              <BackIc />
              <span class='text-base hidden sm:block font-semibold'>All Documents</span>
            </a>
            <button
              id='save'
              onClick={newDocument}
              class='rounded-md py-2 px-5 text-white font-semibold text-sm sm:text-base bg-gradient-to-r from-[#7debf2] to-[#60a4ff]'
            >
              Save
            </button>
          </div>
        </nav>
      </div>
      <main class='bg-[#0d1117] px-5 md:px-12 pt-10 h-screen fixed w-full'>
        <GrammarFix documentValues={documentValues} isReadyToSave={isReadyToSave} />
      </main>
    </>
  )
}
