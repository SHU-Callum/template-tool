import { ReactNode } from "react";

interface RoundedLabelProps {
  text: string;
  borderColour?: string;
  textBold?: boolean;
  iconButton?: ReactNode;
  fullWidth?: boolean;
}

function RoundedLabel({ text, borderColour="border-blue-500", textBold=false, iconButton, fullWidth}: RoundedLabelProps) {
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
    gap-2
    ${fullWidth ? 'w-full' : ''}`}>
      <div className="flex-1 text-center">
      {textBold ? 
      <span className="font-bold text-base">{text}</span>
      :
      <span>{text.length > 14 ? `${text.substring(0, 14)}...` : text}</span>
      }
      </div>
      {iconButton}
    </div>
  )
}
export default RoundedLabel;