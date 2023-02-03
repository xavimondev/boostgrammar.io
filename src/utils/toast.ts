import { toast } from 'wc-toast'

type TypeNotify = 'success' | 'promise'
// const theme = {
//   type: 'custom',
//   style: { background: 'white', color: 'black' }
// }
const successNotify = (textSuccess: string) => {
  toast.success(textSuccess, {
    duration: 2000,
    theme: {
      type: 'custom',
      style: { background: 'white', color: 'black' }
    }
  })
}

const promiseNotify = (textSuccess: string, promise: Promise<any>) => {
  toast.promise(
    promise,
    {
      loading: 'Saving document...',
      success: textSuccess,
      error: 'An error has ocurred'
    },
    {
      theme: {
        type: 'custom',
        style: { background: 'white', color: 'black' }
      }
    }
  )
}

export const notify = (typeNotify: TypeNotify, textSuccess: string, promise?: Promise<any>) => {
  if (typeNotify === 'promise') promiseNotify(textSuccess, promise)
  else if (typeNotify === 'success') successNotify(textSuccess)
}
