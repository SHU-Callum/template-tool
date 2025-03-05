// used for providing the data context to the app

import { useReducer, ReactNode } from "react";
import dataReducer, {initialState} from "./dataReducer";
import { getTemplateById, getTemplatesByText } from "./dataActions";
import { DataContext } from "./dataContext";


const DataProvider = ({children}: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const handleGetTemplateById = (templateId: number) => {
    getTemplateById(templateId, dispatch);
  };

  const handleGetTemplatesByText = (text: string) => {
    getTemplatesByText(text, dispatch);
  };

  return (
    <DataContext.Provider value={{state, getTemplateById: handleGetTemplateById, getTemplatesByText: handleGetTemplatesByText}}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };