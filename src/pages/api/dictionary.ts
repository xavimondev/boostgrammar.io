import { APIRoute } from 'astro'

const RAPID_API_ENDPOINT = 'https://thesaurus-by-api-ninjas.p.rapidapi.com/v1/thesaurus?word='

export const get: APIRoute = async ({ request }) => {
  const url = new URL(request.url)
  const word = url.searchParams.get('word')
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'thesaurus-by-api-ninjas.p.rapidapi.com'
    }
  }

  const requestFetch = await fetch(`${RAPID_API_ENDPOINT}${word}`, options)
  const data = await requestFetch.json()

  return new Response(
    JSON.stringify({
      data: data.synonyms
    }),
    {
      status: 200
    }
  )
}
