import { useState } from "react";
import Notification from "../components/Notification";

function Search() {
  const [searchText, setSearchText] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const searchClicked = () => {
    setShowNotification(true);
  };

  return (
    <div className="p-4 w-3/4">
      <div className="flex justify-between mb-4 items-center">
        <div>
          <label className="mr-2">Dropdown:</label>
          <select className="border rounded p-2">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="flex items-center">
          <div className="mb-1">
            <label className="mr-2" htmlFor="check">Checkbox:</label>
          </div>
          <input type="checkbox" id="check" className="w-4 h-4" />
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
        <button className="bg-blue-500 text-white p-2 rounded" onClick={searchClicked}>Search</button>
      </div>
      <hr />
      {showNotification && <Notification message="Search Clicked!" onClose={() => setShowNotification(false)} />}
    </div>
  );
}

export default Search;