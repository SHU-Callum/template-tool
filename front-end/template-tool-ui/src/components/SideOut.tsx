import { useState } from "react";
import { useNotification } from "../context/notification/useNotification";

interface SideOutProps {
  isOpen: boolean;
  onClose: () => void;
}

function SideOut({ isOpen, onClose }: SideOutProps) {
  const { addNotification, } = useNotification();
  const [searchText, setSearchText] = useState('');
  
  const searchClicked = () => {
    addNotification(`Searching for: ${searchText}`);
    //TODO: Implement search logic
    setSearchText('');
  };
  return (
    <div className={`border-l-2 border-gray-200 p-4 w-1/2 h-full bg-white fixed top-0 right-0 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className='flex w-full pb-4'>
        <div className='flex w-full justify-start gap-4'>
          <svg onClick={onClose} className="w-12 h-12 text-gray-800 dark:text-white mt-2 hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-transform transform hover:scale-110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
          </svg>
          <h1 className='text-left'>Profile</h1>
        </div>
      </div>
      {/* TODO: Dynamic data */}
      <div>
        <h2>Test User</h2>
        <p>test@user.com</p>
      </div>
      <div>
        <h3>Teams:</h3>
        <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded p-2 flex-grow mr-2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded" onClick={searchClicked}>Search</button>
      </div>
      </div>
    </div>
  );
}

export default SideOut;