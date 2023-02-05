type SynonymsProps = {
  synonyms: string[]
}

export function SynonymsList({ synonyms }: SynonymsProps) {
  return (
    <>
      {synonyms.length > 0
        ? synonyms.map((synonym: string) => <SynonymButton synonymValue={synonym} />)
        : null}
    </>
  )
}

type SynonymButtonProps = {
  synonymValue: string
}

export function SynonymButton({ synonymValue }: SynonymButtonProps) {
  return (
    <button class='text-sm sm:text-base font-bold py-1 px-6 sm:px-8 bg-blue-100 text-blue-800 rounded-lg hover:bg-green-500 hover:text-white'>
      {synonymValue}
    </button>
  )
}

export function SynonymsLoader() {
  return <p class='text-base sm:text-base text-gray-500 font-bold'>Loading...</p>
}
