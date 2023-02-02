import { toast } from 'wc-toast'

export const notify = (text: string) => {
  toast.success(text, {
    duration: 2000,
    theme: {
      type: 'custom',
      style: { background: 'white', color: 'black' }
    }
  })
}
