type WordOutputProps = {
  word: string
  synonyms: any
}

const getSynonyms = async (word: string) => {
  const request = await fetch(`/api/dictionary?word=${word}`)
  const { data } = await request.json()
  return data.splice(0, 4)
}

export function WordOutput({ word, synonyms }: WordOutputProps) {
  return (
    <span
      class='text-lg sm:text-xl text-white'
      id='grammarOutput'
      onDblClick={async () => {
        const data = await getSynonyms(word)
        synonyms.value = data
      }}
    >
      {word}
    </span>
  )
}
