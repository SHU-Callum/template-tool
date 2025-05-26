// used for creating the template display mode context

import { createContext } from "react";
import { TemplateViewMode } from "../../types/templateViewTypes";
import { InputFieldMap } from "./DisplayModeProvider";

interface DisplayModeContextType {
  mode: TemplateViewMode
  setMode: (mode: TemplateViewMode) => void
  inputFields: InputFieldMap
  setInputFields: React.Dispatch<React.SetStateAction<InputFieldMap>>
}

export const DisplayModeContext = createContext<DisplayModeContextType | undefined>(undefined);