import { useState } from 'react';
import FooterBar from './components/FooterBar';
import HeaderBar from './components/HeaderBar';
import { useNotification } from './context/notification/useNotification';
import Search from './pages/Search';
import SideOut from './components/SideOut';


function App() {
  const { addNotification, } = useNotification();
  const [isSideOutOpen, setIsSideOutOpen] = useState(false);
  const [isSideOutRendered, setIsSideOutRendered] = useState(false);

  const openSideout = () => {
    setIsSideOutRendered(true);
    setTimeout(() => {
      setIsSideOutOpen(true);
    }, 10); // Small delay to ensure the component is rendered before the transition starts
  };

  const closeSideout = () => {
    setIsSideOutOpen(false);
    setTimeout(() => {
      setIsSideOutRendered(false);
    }, 300); // Duration of the transition
  };
  
  const profileClicked = () => {
    openSideout();
  };

  const infoClicked = () => {
    addNotification('Info Clicked');
  };

  return (
    <div className='p-4 pt-2 w-full h-full flex flex-col'>
      <HeaderBar profileClicked={profileClicked} />
      <div className='flex items-center w-full'>
        <Search />
      </div>
      <div className='flex-grow flex items-center w-full'>
        {/* Empty space that will grow */}
      </div>
      <FooterBar infoClicked={infoClicked} />
      {isSideOutRendered && <SideOut isOpen={isSideOutOpen} onClose={closeSideout} />}
    </div>
  );
}

export default App;
