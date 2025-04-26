import { useEffect, useRef, useState } from 'react';
import FooterBar from './components/FooterBar';
import HeaderBar from './components/HeaderBar';
import { useNotification } from './context/notification/useNotification';
import Search from './pages/Search';
import ViewTemplate from './pages/ViewTemplate';
import SideOut from './components/SideOut';
import { NotificationType } from './types/notificationTypes';
import { BrowserRouter, Route, Routes  } from 'react-router';
import { useAuth } from './context/auth/useAuth';
import Keycloak from 'keycloak-js';


function App() {
  const { addNotification, } = useNotification();
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  const authenticationAttempted = useRef(false);
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
    addNotification('Info Clicked', NotificationType.INFO);
  };

  // For Debugging
  /*useEffect(() => {
    console.log('App rendered');
  }, []);*/

  useEffect(() => {
    if (!authenticationAttempted.current) {
      authenticationAttempted.current = true;
      const client = new Keycloak({
        url: import.meta.env.VITE_KC_URL,
        realm: import.meta.env.VITE_KC_REALM,
        clientId: import.meta.env.VITE_KC_CLIENT,
      });
      client.init({ onLoad: 'login-required' }).then((authenticated) => {setIsLoggedIn(authenticated);})
    }
  }, [setIsLoggedIn]);

  return (
    <BrowserRouter>
      <div className='p-4 pt-2 w-full h-full flex flex-col'>
        <HeaderBar profileClicked={profileClicked} />
        {isLoggedIn ? (<p>logged in</p>) : (<p>not logged in</p>)}
        <div className='flex items-center w-full'>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/view-template" element={<ViewTemplate />} />
          </Routes>
        </div>
        <div className='flex-grow flex items-center w-full'>
          {/* Empty space that will grow */}
        </div>
        <FooterBar infoClicked={infoClicked} />
        {isSideOutRendered && <SideOut isOpen={isSideOutOpen} onClose={closeSideout} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
