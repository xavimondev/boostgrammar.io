import { supabase } from '../lib/database'
import { DASHBOARD_URL } from '@utils/constants'

export const signInWithGitHub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: DASHBOARD_URL
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
