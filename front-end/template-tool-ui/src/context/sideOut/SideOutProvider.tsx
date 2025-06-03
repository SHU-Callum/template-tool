import { ReactNode, useState } from "react";
import { SideOutContext } from "./sideOutContext";

export const SideOutProvider = ({children}: {children: ReactNode}) => {
  const [isSideOutOpen, setIsSideOutOpen] = useState(false);
  const [isSideOutRendered, setIsSideOutRendered] = useState(false);
  const [focusTeamCreate, setFocusTeamCreate] = useState(false);

    const openSideout = (autoFocus?: boolean) => {
    setIsSideOutRendered(true);
    setTimeout(() => {
      setIsSideOutOpen(true);
    }, 10); // Small delay to ensure the component is rendered before the transition starts
    autoFocus && setFocusTeamCreate(true);
  };

  const closeSideout = () => {
    setIsSideOutOpen(false);
    setTimeout(() => {
      setIsSideOutRendered(false);
    }, 300); // Duration of the transition
    setFocusTeamCreate(false);
  };

  return (
    <SideOutContext.Provider value={{ isSideOutOpen, isSideOutRendered, openSideout, closeSideout, focusTeamCreate, setFocusTeamCreate }}>
      { children }
    </SideOutContext.Provider>
  )
}