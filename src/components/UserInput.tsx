import { useCallback } from 'preact/hooks'
import debounce from 'just-debounce-it'
import { getCorrectionFromInput } from '@services/grammar'

type UserInputProps = {
  setOutputValue: (output: string) => void
  setLoading: (loadingValue: boolean) => void
  setTotalWords: (totalWords: number) => void
  getTotalMistakes: (text: string) => void
}

export function UserInput({
  setOutputValue,
  setLoading,
  setTotalWords,
  getTotalMistakes
}: UserInputProps) {
  const autoCompleteDebounce = useCallback(
    debounce(async (inputValue: string) => {
      setTotalWords(inputValue.trim().replaceAll(' ', '').length)
      const correctionValue = await getCorrectionFromInput(inputValue)
      setLoading(false)
      setOutputValue(correctionValue)
      getTotalMistakes(inputValue)
    }, 200),
    []
  )

  const handleInputChange = (e: any) => {
    e.preventDefault()
    const inputValue = e.target.value
    if (inputValue === '') {
      setOutputValue('')
      return
    }
    console.log(inputValue)
    // trigger debounce
    setOutputValue('')
    setLoading(true)
    autoCompleteDebounce(inputValue)
  }

  return (
    <textarea
      id='userInput'
      name='userInput'
      placeholder='Type or paste your text here'
      class='bg-[#0d1117] text-lg resize-none focus:outline-none text-white w-full h-full'
      onChange={handleInputChange}
    ></textarea>
  )
}
