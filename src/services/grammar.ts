import { SERVER } from '@utils/constants'

export const getCorrectionFromInput = async (input: string) => {
  const response = await fetch(`${SERVER}/grammar`, {
    method: 'POST',
    body: JSON.stringify({
      input
    })
  })
  const data = await response.json()
  return data.output
}

export const getGrammaticalMistakesFromText = async (text: string) => {
  const request = await fetch(`${SERVER}/checking`, {
    method: 'POST',
    body: JSON.stringify({
      text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const response = await request.json()
  return response.result
}
