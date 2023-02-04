import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import cors from '@fastify/cors'
import path from 'node:path'
import { COHERE_API_GENERATE_URL, PROMPT_EXAMPLES, RAPID_API_ENDPOINT } from './constants.js'

const server = Fastify({ logger: true })
await server.register(cors, {
  methods: ['GET', 'POST']
})

const schema = {
  type: 'object',
  required: ['RAPID_API_KEY', 'PORT', 'COHERE_API_KEY'],
  properties: {
    RAPID_API_KEY: {
      type: 'string',
      default: ''
    },
    PORT: {
      type: 'number',
      default: 3000
    },
    COHERE_API_KEY: {
      type: 'string',
      default: ''
    }
  }
}
const ENV_PATH = path.join(process.cwd(), '.env')

const optionsConf = {
  schema,
  dotenv: {
    path: ENV_PATH
  }
}

// Run the server!
const start = async () => {
  try {
    await server.register(fastifyEnv, optionsConf)
    await server.ready()
    await server.listen({
      host: '0.0.0.0',
      port: process.env.PORT
    })
    console.log('Running server 🚀')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

server.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Declare a route
server.route({
  method: 'GET',
  url: '/dictionary',
  schema: {
    querystring: {
      word: {
        type: 'string'
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          data: {
            type: 'array'
          }
        }
      }
    }
  },
  handler: async (req, reply) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'thesaurus-by-api-ninjas.p.rapidapi.com'
      }
    }
    const { word } = req.query
    const requestFetch = await fetch(`${RAPID_API_ENDPOINT}${word}`, options)
    const response = await requestFetch.json()
    const data = response.synonyms
    return { data }
  }
})

server.route({
  method: 'POST',
  url: '/grammar',
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          output: {
            type: 'string'
          }
        }
      }
    }
  },
  handler: async (req, reply) => {
    const body = req.body
    const { input } = JSON.parse(body)
    console.log(input)
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
        Authorization: `BEARER ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json',
        'Cohere-Version': '2022-12-06'
      },
      body: JSON.stringify(data)
    })
    const response = await requestCohere.json()
    const { text } = response.generations[0]
    const textOutput = text.replace('--', '').replaceAll('"', '').trim()
    return {
      output: textOutput
    }
  }
})

start()
