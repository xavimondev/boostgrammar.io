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
