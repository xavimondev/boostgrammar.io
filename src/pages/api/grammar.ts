import { APIRoute } from 'astro'
import cohere from 'cohere-ai'

cohere.init(import.meta.env.COHERE_API_KEY)

const PROMPT_EXAMPLES = `Fix the grammar in this sentence.
--
Incorrect sample: "Me and her went to the park"
Correct sample: "She and I went to the park."
--
Incorrect sample: "He has 23 years old"
Correct sample: "He is 23 years old."
--
Incorrect sample: "He has twenty-three years old"
Correct sample: "He is twenty-three years old."
--
Incorrect sample: "Who else did you saw from the party"
Correct sample: "Who else did you see at the party?"
--
Incorrect sample: "Twenty nine is great than eight"
Correct sample: "Twenty nine is greater than eight."
--
Incorrect sample: "lets eat grandma"
Correct sample: "let's eat, grandma."
--
Incorrect sample: "Miguel were programming alone"
Correct sample: "Miguel was programming alone."
--
Incorrect sample: "She eat yesterday in his house and nobody were there to say her something"
Correct sample: "She ate yesterday in her house and nobody was there to say something to her"
--
Incorrect sample: "My friend think pair programming is a good way to know other people skills,however a few companies bet on this"
Correct sample: "My friend thinks pair programming is a good way to know other people skills, however a few companies believe in this."
--
Incorrect sample: "Despite the fact that working from home has its benefits, such as being able to avoid the daily commute and have a much flexible schedule, it also have its drawbacks, such as the lack of social interaction and a difficulty of separating work from personal life."
Correct sample: "Even though working from home has its benefits, such as avoiding the daily commute and having a more flexible schedule, it also has its drawbacks, such as the lack of social interaction and the difficulty of separating work from personal life."
--
Incorrect sample: "I need eat apple"
Correct sample: "I need to eat an apple"
--
Incorrect sample: "hello i'm xavi from peru"
Correct sample: "Hello I'm Xavi from Peru"`

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
