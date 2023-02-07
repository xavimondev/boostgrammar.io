import { GitHubIc } from '@components/Icons'
import { signInWithGitHub } from '@services/auth'

export function SignInButton() {
  const handleLogin = async () => {
    await signInWithGitHub()
  }

  return (
    <button
      class='rounded-md bg-gradient-to-r from-[#11ccda] to-[#4490f2] py-1.5 px-5 text-sm font-semibold text-white flex gap-2 items-center'
      onClick={handleLogin}
    >
      Sign in
      <GitHubIc class='h-6 w-6' />
    </button>
  )
}
