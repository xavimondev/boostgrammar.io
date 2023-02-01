export function LoadingIndicator({ isLoading }) {
  return (
    <>
      {isLoading.value ? (
        <div class='w-full h-1 relative bg-gray-900 overflow-hidden'>
          <div class='w-full h-full bg-gradient-to-tr from-cyan-500 to-blue-500 absolute left-0 animate-bar-infinite'></div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}
