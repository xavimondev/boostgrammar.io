import { useEffect, useRef } from 'preact/hooks'
import { signal, computed } from '@preact/signals'
import { supabase } from '@lib/database'
import { saveDocument } from '@services/document'
import { getCorrectionFromInput, getGrammaticalMistakesFromText } from '@services/grammar'
import { transformStringArrayToString } from '@utils/arrayToString'
import { notify } from '@utils/toast'
import { Mistake } from 'src/types'
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
const isUserLogged = signal<boolean>(false)
const isLoading = signal<boolean>(false)
const inputValue = signal<string>('')
const totalCharacteres = signal<number>(0)
const outputValue = signal<string>('')
// When `outputValue` changes, this re-runs automatically:
const outputValueAsArray = computed(() => {
  return outputValue.value.length === 0 ? [] : outputValue.value.split(' ')
})
const wordsFromEnteredText = signal<string[]>([])
const wrongWordsFromEnteredText = signal<string[]>([])
const mistakesList = signal<Mistake[]>([])

export function DocumentGenerator() {
  const titleRef = useRef<HTMLInputElement>(undefined)
  const textEnteredRef = useRef<HTMLTextAreaElement>(undefined)

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        isUserLogged.value = true
      }
    }
    getUserData()
  }, [])

  const setDocumentValues = async () => {
    const title = titleRef.current.value || 'Untitled document'
    const wordsFromText = wordsFromEnteredText.value
    const userInput = transformStringArrayToString(wordsFromText)
    const grammarOutput = outputValue.value
    const { data } = await supabase.auth.getUser()
    const userId = data.user.id

    const totalWords = wordsFromText.length
    const totalMistakes = wrongWordsFromEnteredText.value.length

    const doc = {
      title,
      userInput,
      grammarOutput,
      totalWords,
      totalMistakes,
      userId
    }

    documentValues.value = doc
    isReadyToSave.value = true
  }

  const getMistakesFromText = async (inputValue: string) => {
    // 'Some people does not wanna to eat meals'
    const { result, wrongWordsList } = await getGrammaticalMistakesFromText(inputValue)
    mistakesList.value = result
    wordsFromEnteredText.value = inputValue.split(' ')
    wrongWordsFromEnteredText.value = wrongWordsList
    setDocumentValues()
  }

  const newDocument = async () => {
    notify('promise', 'Document saved', saveDocument(documentValues.value))

    isReadyToSave.value = false
    documentValues.value = initialState
  }

  const generateOutput = async () => {
    outputValue.value = ''
    isLoading.value = true
    const enteretedText = textEnteredRef.current.value
    totalCharacteres.value = enteretedText.trim().replaceAll(' ', '').length
    const correctionValue = await getCorrectionFromInput(enteretedText)
    isLoading.value = false
    outputValue.value = correctionValue
    getMistakesFromText(enteretedText)
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
            <div className='flex gap-2'>
              {isUserLogged.value && (
                <button
                  id='save'
                  onClick={newDocument}
                  disabled={!isReadyToSave.value}
                  class={`rounded-md py-2 px-5 text-white font-semibold text-sm sm:text-base ${
                    !isReadyToSave.value
                      ? 'bg-gray-400'
                      : 'bg-gradient-to-r from-[#7debf2] to-[#60a4ff]'
                  }`}
                >
                  Save
                </button>
              )}
              <button
                onClick={generateOutput}
                class={`rounded-md py-2 px-5 text-white font-semibold text-sm sm:text-base bg-gradient-to-r from-[#7debf2] to-[#60a4ff]`}
              >
                Run
              </button>
            </div>
          </div>
        </nav>
      </div>
      <main class='bg-[#0d1117] px-5 md:px-12 pt-10 h-screen fixed w-full'>
        <GrammarFix
          isLoading={isLoading}
          totalCharacteres={totalCharacteres}
          outputValue={outputValue}
          outputValueAsArray={outputValueAsArray}
          wordsFromEnteredText={wordsFromEnteredText}
          wrongWordsFromEnteredText={wrongWordsFromEnteredText}
          mistakesList={mistakesList}
          titleRef={titleRef}
          textEnteredRef={textEnteredRef}
        />
      </main>
    </>
  )
}
