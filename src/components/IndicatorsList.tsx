function Indicator({ children }) {
  return <div class='flex flex-col gap-0.5 items-center'>{children}</div>
}
function IndicatorTitle({ children }) {
  return <span class='font-bold text-base sm:text-1xl text-gray-400 uppercase'>{children}</span>
}
function IndicatorValue({ children }) {
  return <span class='font-semibold text-sm sm:text-xl text-gray-600'>{children}</span>
}

export function IndicatorsList({ totalWords, totalCharacters, totalMistakes }) {
  return (
    <div class='flex gap-12 justify-center bg-white rounded-lg py-2'>
      <Indicator>
        <IndicatorTitle>words</IndicatorTitle>
        <IndicatorValue>{totalWords}</IndicatorValue>
      </Indicator>
      <Indicator>
        <IndicatorTitle>characters</IndicatorTitle>
        <IndicatorValue>{totalCharacters}</IndicatorValue>
      </Indicator>
      <Indicator>
        <IndicatorTitle>mistakes</IndicatorTitle>
        <IndicatorValue>{totalMistakes}</IndicatorValue>
      </Indicator>
    </div>
  )
}
