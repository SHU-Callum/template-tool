import { useCallback, useEffect, useRef, useState } from "react";
import { useNotification } from "../context/notification/useNotification";
import SelectInput from "../components/SelectInput";
import { NotificationType } from "../types/notificationTypes";
import { Template } from "../models/template";
import TemplateSearchResults from "../components/TemplateSearchResults";
import { useDispatchContext, useStateContext } from "../context/data/useData";
import { getTemplatesByTeams, getTemplatesByText } from "../context/data/actions/templateActions";
import { Team } from "../models/team";

function Search() {
  const initialResults: Template[] = [];

  // from context providers
  const { addNotification, handleNetworkError, networkError } = useNotification();
  const state = useStateContext();
  const dispatch = useDispatchContext();

  // local state
  const [searchText, setSearchText] = useState('');
  const [dropdownTeams, setDropdownTeams] = useState<string[]>([]);
  const [searchTeamFilter, setSearchTeamFilter] = useState<Team[]>([]);
  const [searchIncludeViewOnly, setSearchIncludeViewOnly] = useState(false);
  const [searchResults, setSearchResults] = useState(initialResults);
  const [loading, setLoading] = useState(false);
  const errorNotifiedRef = useRef(false); // used to prevent error notification loop
  const prevTeamsRef = useRef(state.teamState.teamsByUser); // used to prevent unnecessary rerendering

  const handleGetTemplatesByTeams = (teams: number[]) => {
    getTemplatesByTeams(teams, dispatch);
    setLoading(true);
  }; /* - is handled by useRef */
  const fetchAllTemplatesRef = useRef(handleGetTemplatesByTeams);

  const handleGetTemplatesByText = (text: string) => {
    getTemplatesByText(text, dispatch);
    setLoading(true);
  };

  const searchClicked = () => {
    const searchTeamsText = searchTeamFilter.length == 1 ? searchTeamFilter[0].teamName : 'All Teams';
    addNotification(`Searching for: ${searchText}, Team: ${searchTeamsText}, Include View Only: ${searchIncludeViewOnly}`, NotificationType.INFO);
    // TODO: Update by text to by params
    handleGetTemplatesByText(searchText);
    setLoading(true);
  };

  // When the user selects a team from the dropdown
  const selectTeamFilterChanged = useCallback((selectedTeam: string) => {
    const availableTeams = state.teamState.teamsByUser;
    const availableTemplates = state.templateState.templatesByTeams;
    if (selectedTeam === 'All Teams') {
      setSearchTeamFilter(availableTeams ? availableTeams : []);
      setSearchResults(state.templateState.templatesByTeams || []);
    } else if (availableTeams && availableTemplates) {
      const filteredTeams = availableTeams.filter(team => team.teamName === selectedTeam);
      setSearchTeamFilter(filteredTeams);
      const filteredTemplates = availableTemplates.filter(template => template.teamId === filteredTeams[0].id);
      setSearchResults(filteredTemplates);
    } else {
      setSearchTeamFilter([]);
    }
  }, [state.teamState.teamsByUser, state.templateState.templatesByTeams]);

  const checkboxViewOnlyClicked = () => {
    setSearchIncludeViewOnly(!searchIncludeViewOnly);
  };

  // When the GET Teams By User API call returns
  useEffect(() => {
    // When the user's teams are fetched
      if(state.teamState.teamsByUser) {
        // Set the available teams for dropdown
        const availableTeams = ['All Teams', ...state.teamState.teamsByUser.map(team => team.teamName)];
        setSearchTeamFilter(state.teamState.teamsByUser);
        setDropdownTeams(availableTeams);
        if(state.teamState.teamsByUser !== prevTeamsRef.current) {
          // Map over state.teamState.teamsByUser to extract teamId values
          const teamIds = state.teamState.teamsByUser.map(team => team.id);
          // Fetch the list of templates
          fetchAllTemplatesRef.current(teamIds);
        }
        handleNetworkError(false);
      }
      // Show error notification if there is an error
      if(state.teamState.error && !errorNotifiedRef.current) {
        addNotification(state.teamState.error, NotificationType.ERROR);
        errorNotifiedRef.current = true;
        if(state.teamState.error.includes('Network Error') && !networkError) {
          handleNetworkError(true);
        }
      // Update loading state
      setLoading(false);
      // remember the previous teams
      prevTeamsRef.current = state.teamState.teamsByUser;
    }
  }, [addNotification, state.teamState.teamsByUser, state.teamState.error, networkError, handleNetworkError]);

  // When the GET Templates By Teams API call returns
  useEffect(() => {
    // When the initial templates are fetched
      if(state.templateState.templatesByTeams) {
        const templates = state.templateState.templatesByTeams;
        setSearchResults(templates);
        handleNetworkError(false);
      }
      // Show error notification if there is an error
      else if(state.templateState.error && !errorNotifiedRef.current) {
        addNotification(state.templateState.error, NotificationType.ERROR);
        errorNotifiedRef.current = true;
        if(state.templateState.error.includes('Network Error') && !networkError) {
          handleNetworkError(true);
        }
      }
      // Update loading state
      setLoading(false);
  }, [addNotification, state.templateState.templatesByTeams, state.templateState.error, networkError, handleNetworkError]);

  // When the GET Templates By Text API call returns
  useEffect(() => {
    // Update search results when the API call returns
    if(state.templateState.templatesByText) {
      const templates = state.templateState.templatesByText;
      setSearchResults(templates);
      handleNetworkError(false);
    }
    // Show error notification if there is an error
    else if(state.templateState.error && !errorNotifiedRef.current) {
      addNotification(state.templateState.error, NotificationType.ERROR);
      errorNotifiedRef.current = true;
      if(state.templateState.error.includes('Network Error') && !networkError) {
        handleNetworkError(true);
      }
    }
    setLoading(false)
  }, [addNotification, state.templateState.templatesByText, state.templateState.error, networkError, handleNetworkError]);

  // reset error notification flag when an API call is loading
  useEffect(() => {
    if (state.templateState.loading || state.teamState.loading) {
      errorNotifiedRef.current = false;
    }
  }, [state.teamState.loading, state.templateState.loading]);

  return (
    <div className="p-4 w-full sm:w-6/7 mx-auto">
      <div className="w-full sm:w-4/5 lg:w-2/3 mx-auto">
        <div className="flex justify-between mb-4 items-center space-x-8">
          <SelectInput 
            value={searchTeamFilter.length == 1 ? searchTeamFilter[0].teamName : 'All Teams'}
            onChange={selectTeamFilterChanged}
            options={dropdownTeams}
            label="Filter by Team:"
          />      
          <div className="flex items-center">
            <div className="mb-1 text-right pr-3">
            <label htmlFor="check">Include View-only templates</label>
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
            className="border rounded p-2 mr-2 w-4/5"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded w-2/5 sm:w-1/5" onClick={searchClicked}>Search</button>
        </div>
      </div>
      <hr />
      <div className="pt-4">
      {loading ? <div>Loading...</div> : <TemplateSearchResults results={searchResults}/>}
      </div>
    </div>
  );
}

export default Search;