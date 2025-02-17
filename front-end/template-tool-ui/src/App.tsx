import './App.css';
import FooterBar from './components/FooterBar';
import HeaderBar from './components/HeaderBar';
import { useNotification } from './context/notification/useNotification';
import Search from './pages/Search';


function App() {
  const { addNotification, } = useNotification();
  const profileClicked = () => {
    addNotification('Profile Clicked');
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
    </div>
  );
}

export default App;
