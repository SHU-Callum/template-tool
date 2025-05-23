import { ReactNode, useState } from "react";
import { DisplayModeContext } from "./displayModeContext";
import { TemplateViewMode } from "../../types/templateViewTypes";

export const DisplayModeProvider = ({children}: {children: ReactNode}) => {
  const [mode, setMode] = useState<TemplateViewMode>(TemplateViewMode.Edit);

  return (
    <DisplayModeContext.Provider value={{ mode, setMode }}>
      { children }
    </DisplayModeContext.Provider>
  )
}