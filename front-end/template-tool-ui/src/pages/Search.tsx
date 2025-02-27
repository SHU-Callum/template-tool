import { useState } from "react";
import { useNotification } from "../context/notification/useNotification";
import SelectInput from "../components/SelectInput";
import TemplateSearchResults from "../components/TemplateSearchResults";
import axios from "axios";
import { NotificationType } from "../types/notificationTypes";

function Search() {
  const initialResults = [
    { name: "nam", description: "desc" },
    { name: "nam1", description: "desc1" },
    { name: "nam2", description: "desc2" }
  ];

  const { addNotification } = useNotification();
  const [searchText, setSearchText] = useState('');
  const [searchTeamFilter, setSearchTeamFilter] = useState('All Teams');
  const [searchIncludeViewOnly, setSearchIncludeViewOnly] = useState(false);
  const [searchResults, setSearchResults] = useState(initialResults);
  const [loading, setLoading] = useState(false);

  const searchClicked = () => {
    addNotification(`Searching for: ${searchText}, Team: ${searchTeamFilter}, Include View Only: ${searchIncludeViewOnly}`, NotificationType.INFO);
    //TODO: Implement search logic
    fetchData();
    setLoading(true);
  };

  const selectTeamFilterChanged = (selectedTeam: string) => {
    setSearchTeamFilter(selectedTeam);
  }

  const checkboxViewOnlyClicked = () => {
    setSearchIncludeViewOnly(!searchIncludeViewOnly);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/templates', {
        timeout: 3000 // 3 seconds timeout
      });
      console.log(response.data);
      setSearchResults(response.data);
    } catch(error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
        addNotification('Timeout Error', NotificationType.ERROR);
      } else if (axios.isAxiosError(error)) {
        console.error(error);
        addNotification(`Something went wrong: ${error.message}`, NotificationType.ERROR);
      } else {
        console.error(error);
        addNotification('Something went wrong', NotificationType.ERROR);
      }
    } finally {
      console.log('Request completed');
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-3/4 mx-auto">
      <div className="flex justify-between mb-4 items-center space-x-8">
        <SelectInput 
          value={searchTeamFilter}
          onChange={selectTeamFilterChanged}
          options={['All Teams', 'Team 1', 'Team 2', 'Team 3']}
          label="Filter by Team:"
        />      
        <div className="flex items-center">
          <div className="mb-1 text-right pr-1">
            <label className="mr-2" htmlFor="check">Include View-only templates</label>
          </div>
          <input type="checkbox" id="check" className="w-4 h-4" 
            onChange={checkboxViewOnlyClicked}
            checked={searchIncludeViewOnly}
          />
        </div>
      </div>
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
      <hr />
      <div className="pt-4">
        {loading ? <div>Loading...</div> : <TemplateSearchResults results={searchResults}/>}
      </div>
    </div>
  );
}

export default Search;