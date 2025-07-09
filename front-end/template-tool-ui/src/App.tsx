import { useEffect, useRef } from 'react';
import FooterBar from './components/FooterBar';
import HeaderBar from './components/HeaderBar';
import { useNotification } from './context/notification/useNotification';
import Search from './pages/Search';
import ViewTemplate from './pages/ViewTemplate';
import { NotificationType } from './types/notificationTypes';
import { BrowserRouter, Route, Routes  } from 'react-router';
import { useAuth } from './context/auth/useAuth';
import Loading from './components/Loading';
import { useDispatchContext, useStateContext } from './context/data/useData';
import { getUserDetails } from './context/data/actions/userActions';
import { getTeamsByUserId } from './context/data/actions/teamActions';
import { setupAxiosInterceptors } from './utils/authTokenPrep';
import { UserAuthDetails } from './context/auth/authContext';
import CreateTemplate from './pages/CreateTemplate';
import ManageTeam from './pages/ManageTeam';
import { useSideOut } from './context/sideOut/useSideOut';
import SideOut from './components/SideOut';

function App() {
  const { addNotification, handleNetworkError, networkError} = useNotification();
  const {isLoggedIn, initializeAuth, authMsg, userAuthDetails, refreshAccessToken} = useAuth();
  const {isSideOutOpen, closeSideout, isSideOutRendered} = useSideOut();
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const errorNotifiedRef = useRef(false); // to prevent error notification loop
  const obtainedKcid = useRef(false); // to prevent fetch user data loop on token refresh

  // API dispatches
  const handleGetUserDetails = (keycloakId: string) => {
    getUserDetails(keycloakId, dispatch);
  }; /* - is handled by useRef */
  const fetchUserDetailsRef = useRef(handleGetUserDetails);

  const handleGetTeamsByUser = (userId: number) => {
      getTeamsByUserId(userId, dispatch);
    };/* - is handled by useRef */
  const fetchAllTeamsRef = useRef(handleGetTeamsByUser);

  // On render begin authentication
  useEffect(() => {
    const storedUserAuthDetails = localStorage.getItem('userAuthDetails');
    if (!userAuthDetails && storedUserAuthDetails) { // if only local storage exists
      const localAuthDetails: UserAuthDetails = JSON.parse(storedUserAuthDetails);
      initializeAuth(localAuthDetails);
    } else if (!userAuthDetails) { // if both doesn't exist
      initializeAuth();
    }
  }, [initializeAuth, userAuthDetails]);

  // When the authentication is completed
  useEffect(() => {
    if (!obtainedKcid.current) { // Ensures only called on first render
      const kcid = userAuthDetails?.kcid;
      if (kcid && refreshAccessToken) {
        setupAxiosInterceptors(refreshAccessToken);
        fetchUserDetailsRef.current(kcid); // Search for user details
        obtainedKcid.current = true;
      }
    }
  }, [refreshAccessToken, userAuthDetails?.kcid])

  // When the GET User Details API call returns
  useEffect(() => {
    // When the user details are fetched
    if(state.userState?.userDetails) {
      if(state.userState.userDetails.id) {
        // Fetch the teams for the user
        fetchAllTeamsRef.current(state.userState.userDetails.id);
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

  if (!isLoggedIn) { // display fail screen
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
        <HeaderBar />
        <div className='flex items-center w-full flex-grow'>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/view-template" element={<ViewTemplate />} />
            <Route path="/create-template" element={<CreateTemplate />} />
            <Route path="/manage-team" element={<ManageTeam />} />
          </Routes>
        </div>
        <FooterBar />     
        {isSideOutRendered && <SideOut isOpen={isSideOutOpen} onClose={closeSideout} />}
      </div>
    </BrowserRouter>
  );
}

export default App;