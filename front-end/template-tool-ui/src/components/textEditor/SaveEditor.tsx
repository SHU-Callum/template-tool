import { useHelpers } from "@remirror/react";
import { useCallback } from "react";

function SaveEditor() {
  const { getJSON } = useHelpers();
  const handleClick = useCallback(() => console.log(JSON.stringify(getJSON())), [getJSON]);

  return (
    <button className="p-2 pl-4 pr-4" onMouseDown={(event) => event.preventDefault()} onClick={handleClick}>
      Save
    </button>
  );
}
export default SaveEditor
