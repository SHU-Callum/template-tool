// used for providing the app access to the data context

import { useContext } from "react";
import { DataDispatchContext, DataStateContext } from "./dataProvider";

export const useStateContext = () => {
  const context = useContext(DataStateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a DataProvider');
  }
  return context;
}

export const useDispatchContext = () => {
  const context = useContext(DataDispatchContext);
  if (!context) {
    throw new Error('useDispatchContext must be used within a DataProvider');
  }
  return context;
}