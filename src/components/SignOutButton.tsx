import { signOut } from 'src/services/auth'

export function SignOutButton() {
  const logout = async () => {
    const { error } = await signOut()
    if (error) {
      // TODO: Show an error message
      console.error(error)
      return
    }
    window.location.href = '/'
  }

  return (
    <button class='text-white' onClick={logout}>
      <svg class='h-8 w-8' viewBox='0 0 21 21' width='21' xmlns='http://www.w3.org/2000/svg'>
        <g
          fill='none'
          fill-rule='evenodd'
          stroke='currentColor'
          stroke-linecap='round'
          stroke-linejoin='round'
          transform='translate(4 3)'
        >
          <path d='m10.595 10.5 2.905-3-2.905-3'></path>
          <path d='m13.5 7.5h-9'></path>
          <path d='m10.5.5-8 .00224609c-1.1043501.00087167-1.9994384.89621131-2 2.00056153v9.99438478c0 1.1045695.8954305 2 2 2h8.0954792'></path>
        </g>
      </svg>
    </button>
  )
}
