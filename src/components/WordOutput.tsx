import { getSynonyms } from '@services/synonyms'

// TODO: Add types
type WordOutputProps = {
  word: string
  synonyms: any
  wordSelected: any
  isLoadingSynonyms: any
}

export function WordOutput({ word, synonyms, wordSelected, isLoadingSynonyms }: WordOutputProps) {
  return (
    <span
      class='text-lg sm:text-xl text-white'
      id='grammarOutput'
      onDblClick={async () => {
        wordSelected.value = word
        isLoadingSynonyms.value = true
        const data = await getSynonyms(word)
        synonyms.value = data
        isLoadingSynonyms.value = false
      }}
    >
      {word}
    </span>
  )
}
