import { ReactNode, useState } from "react";
import { DisplayModeContext } from "./displayModeContext";
import { TemplateViewMode } from "../../types/templateViewTypes";

export type InputFieldMap = Record<string, string>;

export const DisplayModeProvider = ({children}: {children: ReactNode}) => {
  const [mode, setMode] = useState<TemplateViewMode>(TemplateViewMode.Edit); // Edit, Input, Render modes
  const [inputFields, setInputFields] = useState<InputFieldMap>({}); // Map of input field IDs to their values within the template

  return (
    <DisplayModeContext.Provider value={{ mode, setMode, inputFields, setInputFields }}>
      { children }
    </DisplayModeContext.Provider>
  )
}