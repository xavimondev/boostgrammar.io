import { getSynonyms } from '@services/synonyms'
import { PopoverCoordinates } from 'src/types'

type WordOutputProps = {
  word: string
  synonyms: any
  setWordSelected: (word: string) => void
  setIsLoadingSynonyms: VoidFunction
  setPopoverCoordinates: (coordinates: PopoverCoordinates) => void
  openPopover: VoidFunction
}

export function WordOutput({
  word,
  synonyms,
  setWordSelected,
  setIsLoadingSynonyms,
  setPopoverCoordinates,
  openPopover
}: WordOutputProps) {
  return (
    <span
      class='text-base sm:text-lg text-white'
      id='grammarOutput'
      onDblClick={async (event) => {
        synonyms.value = []
        setPopoverCoordinates({
          left: event.currentTarget.offsetLeft,
          top: event.currentTarget.offsetTop + 28
        })
        openPopover()
        setWordSelected(word)
        setIsLoadingSynonyms()
        const data = await getSynonyms(word)
        synonyms.value = data
        setIsLoadingSynonyms()
      }}
    >
      {word}
    </span>
  )
}
