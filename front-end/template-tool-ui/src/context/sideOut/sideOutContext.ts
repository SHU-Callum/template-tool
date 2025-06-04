// used for creating the side out context

import { createContext } from "react";

interface SideOutContextType {
  isSideOutOpen: boolean;
  isSideOutRendered: boolean;
  openSideout: (autoFocus?: boolean) => void;
  closeSideout: () => void;
  focusTeamCreate: boolean;
  setFocusTeamCreate: (focus: boolean) => void;
}

export const SideOutContext = createContext<SideOutContextType | undefined>(undefined);