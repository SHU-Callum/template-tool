import { useEffect, useRef, useState } from "react";
import { useNotification } from "../context/notification/useNotification";
import SelectInput from "../components/SelectInput";
import { NotificationType } from "../types/notificationTypes";
import { Template } from "../models/template";
import TemplateSearchResults from "../components/TemplateSearchResults";
import { useDispatchContext, useStateContext } from "../context/data/useData";
import { getTemplatesByText } from "../context/data/actions/templateActions";

function Search() {
  const initialResults: Template[] = [];

  // from context providers
  const { addNotification } = useNotification();
  const state = useStateContext();
  const dispatch = useDispatchContext();

  // local state
  const [searchText, setSearchText] = useState('');
  const [searchTeamFilter, setSearchTeamFilter] = useState('All Teams');
  const [searchIncludeViewOnly, setSearchIncludeViewOnly] = useState(false);
  const [searchResults, setSearchResults] = useState(initialResults);
  const [loading, setLoading] = useState(false);
  const errorNotifiedRef = useRef(false); // used to prevent error notification loop

  // API dispatches
  const handleGetTemplatesByText = (text: string) => {
    getTemplatesByText(text, dispatch);
  };

  const searchClicked = () => {
    addNotification(`Searching for: ${searchText}, Team: ${searchTeamFilter}, Include View Only: ${searchIncludeViewOnly}`, NotificationType.INFO);
    handleGetTemplatesByText(searchText);
    setLoading(true);
  };

  const selectTeamFilterChanged = (selectedTeam: string) => {
    setSearchTeamFilter(selectedTeam);
  }

  const checkboxViewOnlyClicked = () => {
    setSearchIncludeViewOnly(!searchIncludeViewOnly);
  };

  // When the API call returns
  useEffect(() => {
    // Update search results when the API call returns
    if(state.templateState.templatesByText) {
      const templates = state.templateState.templatesByText;
      setSearchResults(templates);
    }
    // Show error notification if there is an error
    if(state.templateState.error && !errorNotifiedRef.current) {
      addNotification(state.templateState.error, NotificationType.ERROR);
      errorNotifiedRef.current = true;
    }
    // Update loading state
    setLoading(state.templateState.loading);
  }, [addNotification, state.templateState.templatesByText, state.templateState.error, state.templateState.loading]);

  // reset error notification flag when an API call is loading
  useEffect(() => {
    if (state.templateState.loading) {
      errorNotifiedRef.current = false;
    }
  }, [state.templateState.loading]);

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