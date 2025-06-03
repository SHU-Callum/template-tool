interface MoveRightButtonProps {
  clickAction?: () => void;
}

function MoveRightButton({clickAction}: MoveRightButtonProps) {
  return (
    <button className="p-0 rounded-2xl" onClick={clickAction}>
      <svg className="w-5 h-5 md:w-7 md:h-7 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-transform transform hover:scale-110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16 4-4-4-4m6 8 4-4-4-4"/>
      </svg>
    </button>
  )
}
export default MoveRightButton;