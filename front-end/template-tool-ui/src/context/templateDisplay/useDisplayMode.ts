// used for providing the editor access to the template display mode context

import { useContext } from "react";
import { DisplayModeContext } from "./displayModeContext";

export const useDisplayMode = () => {
    const context = useContext(DisplayModeContext);
    if (!context) {
        throw new Error('useDisplayMode must be used within a DisplayModeProvider');
  }
  return context;
}