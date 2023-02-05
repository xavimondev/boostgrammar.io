import { StateUpdater, useCallback } from 'preact/hooks'
import debounce from 'just-debounce-it'
import { getCorrectionFromInput } from '@services/grammar'

type UserInputProps = {
  updateOutputValue: StateUpdater<string[]>
  setLoading: (loadingValue: boolean) => void
  setTotalWords: (totalWords: number) => void
}

export function UserInput({ updateOutputValue, setLoading, setTotalWords }: UserInputProps) {
  const autoCompleteDebounce = useCallback(
    debounce(async (inputValue: string) => {
      setTotalWords(inputValue.trim().replaceAll(' ', '').length)
      const correctionValue = await getCorrectionFromInput(inputValue)
      console.log({
        inputValue,
        correctionValue
      })
      setLoading(false)
      updateOutputValue(correctionValue.split(' '))
    }, 200),
    []
  )

  const handleInputChange = (e: any) => {
    e.preventDefault()
    const inputValue = e.target.value
    if (inputValue === '') {
      updateOutputValue([])
      return
    }
    // trigger debounce
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
