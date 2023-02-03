import { APIRoute } from 'astro'

import { PROMPT_EXAMPLES } from 'src/utils/constants'

const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate'

export const post: APIRoute = async ({ request }) => {
  const { input } = await request.json()
  const data = {
    model: 'xlarge',
    prompt: `${PROMPT_EXAMPLES}
    Incorrect sample:${input}
    Correct sample:`,
    max_tokens: 400,
    temperature: 0, // same response
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ['--'],
    return_likelihoods: 'NONE'
  }

  const requestCohere = await fetch(COHERE_API_GENERATE_URL, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${import.meta.env.COHERE_API_KEY}`,
      'Content-Type': 'application/json',
      'Cohere-Version': '2022-12-06'
    },
    body: JSON.stringify(data)
  })
  const response = await requestCohere.json()
  const { text } = response.generations[0]
  const textOutput = text.replace('--', '').replaceAll('"', '').trim()
  return new Response(
    JSON.stringify({
      output: textOutput
    }),
    {
      status: 200
    }
  )
}
