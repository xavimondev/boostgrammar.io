export const formatDateFromString = (dateString: string) => {
  const date = new Date(dateString)
  const dateFormatted = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)

  return dateFormatted
}
