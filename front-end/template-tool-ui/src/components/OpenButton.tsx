interface OpenButtonProps {
  clickAction?: () => void;
}

function OpenButton({clickAction}: OpenButtonProps) {
  return (
    <button className="p-0 rounded-lg" onClick={clickAction}>
      <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-transform transform hover:scale-110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
      </svg>
    </button>
  )
}
export default OpenButton;