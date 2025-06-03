interface BackButtonProps {
  clickAction?: () => void;
}

function BackButton({clickAction}: BackButtonProps) {
  return (
    <button className="p-0 rounded-2xl" onClick={clickAction}>
      <svg className="w-10 h-10 md:w-12 md:h-12 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-transform transform hover:scale-110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
      </svg>
    </button>
  )
}
export default BackButton;