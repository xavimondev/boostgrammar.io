export const copyTextToClipboard = async (text: string) => {
  if (navigator.clipboard) {
    return await navigator.clipboard.writeText(text)
  }
}
