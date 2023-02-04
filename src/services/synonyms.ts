import { SERVER } from '@utils/constants'

export const getSynonyms = async (word: string) => {
  const request = await fetch(`${SERVER}/dictionary?word=${word}`)
  const { data } = await request.json()
  const synonyms = data.splice(0, 4).map((syn: string) => syn.trim().replaceAll('_', ' '))
  return synonyms
}
