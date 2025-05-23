import { createContext } from "react";
import { TemplateViewMode } from "../../types/templateViewTypes";

interface DisplayModeContextType {
  mode: TemplateViewMode
  setMode: (mode: TemplateViewMode) => void
}

export const DisplayModeContext = createContext<DisplayModeContextType | undefined>(undefined);