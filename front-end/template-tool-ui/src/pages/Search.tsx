import { useState } from "react";
import { useNotification } from "../context/notification/useNotification";

function Search() {
  const { addNotification } = useNotification();
  const [searchText, setSearchText] = useState('');
  const [searchTeamFilter, setSearchTeamFilter] = useState('All Teams');
  const [searchIncludeViewOnly, setSearchIncludeViewOnly] = useState(false);

  const searchClicked = () => {
    addNotification(`Searching for: ${searchText}, Team: ${searchTeamFilter}, Include View Only: ${searchIncludeViewOnly}`);
  };

  const selectTeamFilterChanged =(selectedTeam: string) => {
    setSearchTeamFilter(selectedTeam);
  }

  const checkboxViewOnlyClicked = () => {
    setSearchIncludeViewOnly(!searchIncludeViewOnly);
  };

  return (
    <div className="p-4 w-3/4 mx-auto">
      <div className="flex justify-between mb-4 items-center space-x-8">
        <div className="flex-1 flex items-center">
          <label className="mr-2">Filter by Team:</label>
          <select className="border rounded p-2"
            value={searchTeamFilter}
            onChange={(e) => selectTeamFilterChanged(e.target.value)}>
            <option value="All Teams">All Teams</option>
            <option value="Team 1">Team 1</option>
            <option value="Team 2">Team 2</option>
          </select>
        </div>
        <div className="flex items-center">
            <div className="mb-1 text-right pr-1">
            <label className="mr-2" htmlFor="check">Include View-only templates</label>
            </div>
          <input type="checkbox" id="check" className="w-4 h-4" 
            onClick={checkboxViewOnlyClicked}
            checked={searchIncludeViewOnly}/>
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
      <h2 className="p-4">Results</h2>
    </div>
  );
}

export default Search;