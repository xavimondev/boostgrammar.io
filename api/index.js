import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import cors from '@fastify/cors'
import path from 'node:path'
import { RAPID_API_ENDPOINT } from './constants.js'

const server = Fastify({ logger: true })
await server.register(cors, {
  methods: ['GET', 'POST']
})

const schema = {
  type: 'object',
  required: ['RAPID_API_KEY'],
  properties: {
    RAPID_API_KEY: {
      type: 'string',
      default: ''
    }
  }
}
const ENV_PATH = path.join(process.cwd(), 'api/.env')
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
      port: 3001
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

start()
