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
import Loading from './components/Loading';
import { useDispatchContext, useStateContext } from './context/data/useData';
import { getUserDetails } from './context/data/actions/userActions';
import { getTeamsByUserId } from './context/data/actions/teamActions';

function App() {
  const { addNotification, handleNetworkError, networkError} = useNotification();
  const {isLoggedIn, initializeAuth, authMsg, userAuthDetails} = useAuth();
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const [isSideOutOpen, setIsSideOutOpen] = useState(false);
  const [isSideOutRendered, setIsSideOutRendered] = useState(false);
  const errorNotifiedRef = useRef(false);

  // API dispatches
  const handleGetUserDetails = (keycloakId: string) => {
    getUserDetails(keycloakId, dispatch);
  }; /* - is handled by useRef */
  const fetchUserDetailsRef = useRef(handleGetUserDetails);

  const handleGetTeamsByUser = (userId: number) => {
      getTeamsByUserId(userId, dispatch);
    };/* - is handled by useRef */
    const fetchAllTeamsRef = useRef(handleGetTeamsByUser);

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

  // On render begin authentication
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // When the authentication is completed
  useEffect(() => {
    if(userAuthDetails && userAuthDetails.username){
      fetchUserDetailsRef.current(userAuthDetails.username);
    }
  }, [userAuthDetails])

  // When the GET User Details API call returns
  useEffect(() => {
    // When the user details are fetched
    if(state.userState?.userDetails) {
      if(state.userState.userDetails.userId) {
        // Fetch the teams for the user
        fetchAllTeamsRef.current(state.userState.userDetails.userId);
        handleNetworkError(false);
      }
    }
    // Show error notification if there is an error
    if(state.userState?.error && !errorNotifiedRef.current) {
      addNotification(state.userState.error, NotificationType.ERROR);
      errorNotifiedRef.current = true;
      if(state.userState.error.includes('Network Error') && !networkError) {
        handleNetworkError(true);
      }
    }
  }, [addNotification, handleNetworkError, networkError, state.userState]);  

  if (!isLoggedIn) {
    return (
      <div className='p-4 pt-2 w-full h-full flex flex-col'>
        {
          authMsg.includes('Failed') ? 
          (<div className='p-4 pt-2 w-full h-full flex flex-col items-center justify-center'>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 64 64" 
              className="w-1/5 h-auto mb-4 text-gray-600"
              fill="currentColor"
              >
              <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3" fill="none" />
              <line x1="20" y1="20" x2="44" y2="44" stroke="currentColor" strokeWidth="3" />
              <line x1="44" y1="20" x2="20" y2="44" stroke="currentColor" strokeWidth="3" />
            </svg>
            <p className="text-center text-gray-600 pt-2">{authMsg || "Failed to load resources. Please try again later."}</p>
          </div>) 
          : 
          (<Loading msg={authMsg}/>)
        }
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className='p-4 pt-2 w-full h-full flex flex-col'>
        <HeaderBar profileClicked={profileClicked} />
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