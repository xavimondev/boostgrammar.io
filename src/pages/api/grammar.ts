import { APIRoute } from 'astro'
import cohere from 'cohere-ai'

import { PROMPT_EXAMPLES } from 'src/utils/constants'

cohere.init(import.meta.env.COHERE_API_KEY)

export const post: APIRoute = async ({ request }) => {
  const { input } = await request.json()
  const response = await cohere.generate({
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
  })

  const { generations } = response.body
  const { text } = generations[0]

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
