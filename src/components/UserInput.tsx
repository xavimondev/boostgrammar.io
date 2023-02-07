import { Ref } from 'preact'

type UserInputProps = {
  textEnteredRef: Ref<HTMLTextAreaElement>
}

export function UserInput({ textEnteredRef }: UserInputProps) {
  return (
    <textarea
      ref={textEnteredRef}
      name='userInput'
      placeholder='Type or paste your text here'
      class='bg-[#0d1117] text-lg resize-none focus:outline-none text-white w-full h-full'
    ></textarea>
  )
}
