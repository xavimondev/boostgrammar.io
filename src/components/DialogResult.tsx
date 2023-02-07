type DialogResultProps = {
  hideDialog: VoidFunction
  children: any
}
export function DialogResult({ hideDialog, children }: DialogResultProps) {
  return (
    <>
      <div
        id='overlay'
        class='fixed block z-40 w-screen h-screen inset-0 backdrop-blur bg-opacity-25'
        onClick={hideDialog}
      ></div>
      <div class='block fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 rounded-md px-2 py-6 space-y-5 overflow-y-auto bg-white'>
        {children}
      </div>
    </>
  )
}
