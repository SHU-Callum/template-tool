import OpenButton from "./OpenButton";

interface RoundedLabelProps {
  text: string;
  borderColour?: string;
  textBold?: boolean;
  clickAction?: () => void;
}

function RoundedLabel({ text, borderColour="border-blue-500", textBold=false, clickAction}: RoundedLabelProps) {
  return (
    <div className={`
    border-2 
    rounded-3xl 
    ${borderColour}
    ${textBold ? 'px-3' : ''}
    p-2 
    mb-0.5
    ml-auto
    text-center
    flex
    items-center
    justify-center
    leading-none
    gap-2`}>
      {textBold ? 
      <span className="font-bold text-base">{text}</span>
      :
      <span>{text}</span>
      }
      {clickAction && (
        <OpenButton clickAction={clickAction} />
      )}
    </div>
  )
}
export default RoundedLabel;