import { ReactNode, useState } from "react";
import { DisplayModeContext } from "./displayModeContext";
import { TemplateViewMode } from "../../types/templateViewTypes";

export type InputFieldMap = Record<string, string>;

export const DisplayModeProvider = ({children}: {children: ReactNode}) => {
  const [mode, setMode] = useState<TemplateViewMode>(TemplateViewMode.Edit);
  const [inputFields, setInputFields] = useState<InputFieldMap>({});

  return (
    <DisplayModeContext.Provider value={{ mode, setMode, inputFields, setInputFields }}>
      { children }
    </DisplayModeContext.Provider>
  )
}