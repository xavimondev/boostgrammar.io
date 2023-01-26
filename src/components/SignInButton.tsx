import { signInWithGitHub } from 'src/services/auth'

export function SignInButton() {
  const handleLogin = async () => {
    const data = await signInWithGitHub()
    console.log(data)
  }
  return (
    <>
      <button
        class='rounded-full border border-white bg-white py-1.5 px-5 text-sm font-semibold text-black transition-all hover:bg-white/90'
        onClick={handleLogin}
      >
        Sign in
      </button>
    </>
  )
}
