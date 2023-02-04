import { useEffect } from 'preact/hooks'
import { signal } from '@preact/signals'
import { FUN_FACTS_ENGLISH } from '@utils/constants'
import { LoadingIc } from './Icons'

const funFact = signal<string>(
  'Getting results...In the meantime, Did you know these fun facts about english? 🤔'
)

export function FunFactsEnglish() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const pos = Math.floor(Math.random() * FUN_FACTS_ENGLISH.length)
      const text = FUN_FACTS_ENGLISH.at(pos)
      funFact.value = text
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div class='flex flex-col items-center gap-4 sm:gap-8 h-full w-full mt-6'>
      <LoadingIc class='w-16 h-16 sm:w-20 sm:h-20' />
      <blockquote>
        <p class='font-bold text-sm sm:text-lg text-gray-400 italic text-center'>{funFact.value}</p>
      </blockquote>
    </div>
  )
}
