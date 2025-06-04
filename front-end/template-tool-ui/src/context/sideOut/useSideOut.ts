// used for providing the editor access to the template display mode context

import { useContext } from "react";
import { SideOutContext } from "./sideOutContext";

export const useSideOut = () => {
    const context = useContext(SideOutContext);
    if (!context) {
        throw new Error('useSideOut must be used within a SideOutProvider');
  }
  return context;
}