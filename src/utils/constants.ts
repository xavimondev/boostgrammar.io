const REMOTE_SERVER_URL = 'https://boostgrammar.up.railway.app'
const LOCAL_SERVER_URL = 'http://localhost:3001'
const LOCAL_CLIENT_URL = 'http://localhost:3000'
const isDevelopment = import.meta.env.MODE === 'development'

export const SERVER = isDevelopment ? LOCAL_SERVER_URL : REMOTE_SERVER_URL
export const DASHBOARD_URL = isDevelopment
  ? `${LOCAL_CLIENT_URL}/dashboard`
  : `${REMOTE_SERVER_URL}/dashboard`

export const FUN_FACTS_ENGLISH = [
  'English actually originates from what is now called north west Germany and the Netherlands.',
  `The phrase “long time no see” is believed to be a literal translation of a Native American or Chinese phrase as it is not grammatically correct.`,
  'Go! is the shortest grammatically correct sentence in English. Find out some of the longest words in the English language.',
  'The original name for butterfly was flutterby.',
  'About 4,000 words are added to the dictionary each year.',
  'The two most common words in English are I and you.',
  '11% of the entire English language is just the letter E.',
  'The English language is said to be one of the happiest languages in the world – oh, and the word “happy” is used 3 times more often than the word “sad”!',
  `1/4 of the world’s population speaks at least some English.`,
  'The US doesn’t have an official language.',
  'The most common adjective used in English is “good”.',
  'The most commonly used noun is “time”.',
  'The word “set” has the highest number of definitions.',
  'Month, orange, silver, and purple do not rhyme with any other word.',
  'The English language contains a lot of contronyms – words that can have contradictory meanings depending on context.',
  'Over 80% of the information stored on computers worldwide is in English.',
  'Words that are used to fill in time when speaking, such as “like” or “basically”, are called crutch words (and should best be avoided!)',
  'English is the official language of 67 countries.',
  '90% of English text consists of just 1000 words.',
  'There are 24 different dialects of English in the US.',
  `The word "lol" was added to the Oxford English Dictionary in 2011.`,
  'What is known as British accent came to use in and around London around the time of the American Revolution.',
  'Shakespeare invented many words, such as birthplace, blushing, undress, torture and many more.',
  'The word “Goodbye” originally comes from an Old English phrase meaning “god be with you”.',
  `Etymologically, Great Britain means “great land of the tattooed”.`,
  'The first English dictionary was written in 1755.',
  'The oldest English word that is still in use is “town”.'
]
