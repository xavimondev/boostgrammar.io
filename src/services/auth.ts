import { supabase } from '../lib/database'

export const signInWithGitHub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `http://localhost:3000/dashboard`
    }
  })
  if (error) throw new Error('Something went wrong during authentication')
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return {
    error
  }
}
