import { useEffect } from 'preact/hooks'
import { signal } from '@preact/signals'
import { supabase } from '@lib/database'
import { SignOutButton } from './SignOutButton'
import { SignInButton } from './SignInButton'

//const isLoading = signal<boolean>(false)
const userLogged = signal(undefined)

export function AuthToolbar() {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        const { avatar_url, full_name } = session.user.user_metadata
        userLogged.value = {
          avatar_url,
          full_name
        }
      } else if (event === 'SIGNED_OUT') {
        userLogged.value = undefined
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const { avatar_url, full_name } = session.user.user_metadata
        userLogged.value = {
          avatar_url,
          full_name
        }
      }
    })
  }, [])

  if (userLogged.value === undefined) return <SignInButton />

  return (
    <div class='flex flex-row justify-center items-center gap-6'>
      <div class='flex flex-row justify-center items-center gap-2'>
        <img
          src={userLogged.value.avatar_url}
          alt={`Avatar of ${userLogged.value.full_name}`}
          class='w-8 h-8 rounded-full'
        />
        <span class='text-white text-base font-semibold hidden sm:block'>
          {userLogged.value.full_name}
        </span>
      </div>
      <SignOutButton />
    </div>
  )
}
