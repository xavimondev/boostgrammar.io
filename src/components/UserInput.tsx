import { StateUpdater, useCallback } from 'preact/hooks'
import debounce from 'just-debounce-it'
import { getCorrectionFromInput } from 'src/services/grammar'

type UserInputProps = {
  updateOutputValue: StateUpdater<string>
  setLoading: StateUpdater<boolean>
}

export function UserInput({ updateOutputValue, setLoading }: UserInputProps) {
  const autoCompleteDebounce = useCallback(
    debounce(async (inputValue: string) => {
      const correctionValue = await getCorrectionFromInput(inputValue)
      console.log({
        inputValue,
        correctionValue
      })
      setLoading(false)
      updateOutputValue(correctionValue)
    }, 150),
    []
  )

  const handleInputChange = (e: any) => {
    e.preventDefault()
    const inputValue = e.target.value
    if (inputValue === '') return
    // trigger debounce
    setLoading(true)
    autoCompleteDebounce(inputValue)
  }

  return (
    <textarea
      name='userInput'
      placeholder='Type or paste your text here'
      class='bg-[#0d1117] text-lg sm:text-xl resize-none focus:outline-none text-white w-full h-full'
      onChange={handleInputChange}
    ></textarea>
  )
}
