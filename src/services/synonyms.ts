export const getSynonyms = async (word: string) => {
  const request = await fetch(`/api/dictionary?word=${word}`)
  const { data } = await request.json()
  return data.splice(0, 4)
}
