import { useCallback, useEffect, useRef, useState } from "react";
import { useNotification } from "../context/notification/useNotification";
import SelectInput from "../components/SelectInput";
import { NotificationType } from "../types/notificationTypes";
import { Template } from "../models/template";
import TemplateSearchResults from "../components/TemplateSearchResults";
import { useDispatchContext, useStateContext } from "../context/data/useData";
import { getTemplatesByTeams, getTemplatesByParams } from "../context/data/actions/templateActions";
import { Team } from "../models/team";
import { addTeamNameToTemplates, filterTemplatesByEditable } from "../utils/idToName";
import { Link } from "react-router";

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
  const [searchIncludeViewOnly, setSearchIncludeViewOnly] = useState(true);
  const [searchResults, setSearchResults] = useState(initialResults);
  const [activeSearchResults, setActiveSearchResults] = useState(initialResults);
  const [loading, setLoading] = useState(false);
  const [lastSearchParams, setLastSearchParams] = useState({ teams: 'All Teams', text: '', includeViewOnly: 'True' });
  const [canCreateTemplate, setCanCreateTemplate] = useState(false); // to enable/disable create template button
  const errorNotifiedRef = useRef(false); // used to prevent error notification loop
  const prevTeamsRef = useRef(state.teamState.teamsByUser); // used to prevent unnecessary rerendering

  const handleGetTemplatesByTeams = (teams: number[]) => {
    getTemplatesByTeams(teams, dispatch);
    setLoading(true);
    setLastSearchParams({ teams: 'All Teams', text: '', includeViewOnly: 'True' });
  }; /* - is handled by useRef */
  const fetchAllTemplatesRef = useRef(handleGetTemplatesByTeams);

  const handleGetTemplatesByParams = (teams: number[], text: string, includeViewOnly: boolean) => {
    getTemplatesByParams(teams, text, includeViewOnly, dispatch);
    setLoading(true);
    setLastSearchParams({ teams: searchTeamFilter.length > 1 ? 'All Teams' : searchTeamFilter[0].teamName, text, includeViewOnly: searchIncludeViewOnly? 'True' : 'False' });
  };

  const searchClicked = () => {
    const searchTeamsIds = searchTeamFilter.map((team) => team.id);
    handleGetTemplatesByParams(searchTeamsIds, searchText, searchIncludeViewOnly);
    setLoading(true);
  };

  // When the user selects a team from the dropdown
  const selectTeamFilterChanged = useCallback((selectedTeam: string) => {
    const availableTeams = state.teamState.teamsByUser;
    if (selectedTeam === 'All Teams') {
      setSearchTeamFilter(availableTeams ? availableTeams : []);
    } else if (availableTeams) {
      const filteredTeams = availableTeams.filter(team => team.teamName === selectedTeam); // current selected team
      setSearchTeamFilter(filteredTeams);
    } else {
      setSearchTeamFilter([]);
    }
  }, [state.teamState.teamsByUser]);

  const checkboxViewOnlyClicked = () => {
    setSearchIncludeViewOnly(!searchIncludeViewOnly);
  };

  // When the GET Teams By User API call returns
  useEffect(() => {
    // When the user's teams are fetched
      if(state.teamState.teamsByUser && state.teamState.teamsByUser.length > 0) {
        // Set the available teams for dropdown
        const availableTeams = ['All Teams', ...state.teamState.teamsByUser.map(team => team.teamName)];
        setSearchTeamFilter(state.teamState.teamsByUser);
        setDropdownTeams(availableTeams);
        setCanCreateTemplate(state.teamState.teamsByUser.flat().some(team => team.ownerIds?.includes(state.userState.userDetails?.id ?? -1)));
        if(state.teamState.teamsByUser !== prevTeamsRef.current) {
          // Map over state.teamState.teamsByUser to extract teamId values
          const teamIds = state.teamState.teamsByUser.map(team => team.id);
          // Fetch the list of templates
          fetchAllTemplatesRef.current(teamIds);
        }
        handleNetworkError(false);
      }
      else if(state.teamState.teamsByUser && state.teamState.teamsByUser.length === 0) {
        const availableTeams = ['All Teams'];
        setSearchTeamFilter([]);
        setDropdownTeams(availableTeams);
        setSearchResults([]);
        setActiveSearchResults([]);
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
        setActiveSearchResults(templates);
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

  // When the GET Templates By Params API call returns
  useEffect(() => {
    // Update search results when the API call returns
    if(state.templateState.templatesByParams) {
      const templates = state.templateState.templatesByParams;
      setSearchResults(templates);
      setActiveSearchResults(templates);
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
  }, [addNotification, state.templateState.templatesByParams, state.templateState.error, networkError, handleNetworkError]);

  // reset error notification flag when an API call is loading
  useEffect(() => {
    if (state.templateState.loading || state.teamState.loading) {
      errorNotifiedRef.current = false;
    }
  }, [state.teamState.loading, state.templateState.loading]);

  // Filter the search results based on search text, team filter, and view-only checkbox
  useEffect(() => {
    const templatesWithTeamNames = addTeamNameToTemplates(searchResults, state.teamState.teamsByUser || []);
    // Filter the search results based on team dropdown
    const teamFilteredResults = templatesWithTeamNames.filter((template) => {
      return (
      searchTeamFilter.map((team) => team.id).includes(template.teamId) // if the template teamId is in the selected teamIds
      )
    })
    
    const viewOnlyFilteredResults = (!searchIncludeViewOnly && state.userState.userDetails)? 
      filterTemplatesByEditable(teamFilteredResults, state.userState.userDetails, state.teamState.teamsByUser || [])
      : teamFilteredResults;

    const textFilteredResults = searchText.length > 0 ? viewOnlyFilteredResults.filter((template) => {
      return (
        template.title.toLowerCase().includes(searchText.toLowerCase())
        || template.detail.toLowerCase().includes(searchText.toLowerCase())
        || template.teamName.toLowerCase().includes(searchText.toLowerCase())
        || template.content.toLowerCase().includes(searchText.toLowerCase()));
    }) : viewOnlyFilteredResults;

    setActiveSearchResults(textFilteredResults);
  }
  , [searchText, searchResults, state.teamState.teamsByUser, state.userState.userDetails?.id, searchIncludeViewOnly, searchTeamFilter, state.userState.userDetails]);

  return (
    <div className="p-1 sm:p-4 w-full sm:w-6/7 mx-auto self-start h-full">
      <div className="flex gap-4 justify-between">
        <div className="w-full sm:w-6/7 md:w-5/6 lg:w-2/3 mx-auto">
          <div className="flex justify-between mb-2 items-center sm:w-11/12 md:w-10/12 lg:space-x-0 lg:w-4/5 mx-auto gap-2">
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
          <div className="flex mb-4 sm:w-5/6 lg:w-2/3 mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded p-1.5 mr-2 w-4/5"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-1.5 rounded w-2/5 sm:w-1/5" onClick={searchClicked}>Search</button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <Link to="/create-template">
            <div className="relative group w-full flex justify-center">
              <button
              className="bg-green-500 text-white pl-2 pr-2 p-1.5 rounded whitespace-nowrap w-24 sm:w-28"
              disabled={!canCreateTemplate}
              >
              + Template
              </button>
              {!canCreateTemplate && (
              <div className="absolute bottom-full left-2/3 -translate-x-2/3 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 w-40">
                Must be a team owner to create a template.
              </div>
              )}
            </div>
          </Link>
          <button className="bg-green-500 text-white pl-2 pr-2 p-1.5 rounded whitespace-nowrap w-24 sm:w-28">
            + Team
          </button>
        </div>
      </div>
      
      <hr />
      <div className="pt-3">
      {loading ? <div>Loading...</div> : <TemplateSearchResults results={activeSearchResults} criteria={lastSearchParams}/>}
      </div>
    </div>
  );
}

export default Search;