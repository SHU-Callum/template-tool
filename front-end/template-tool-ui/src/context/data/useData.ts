// used for providing the app access to the data context

import { useContext } from "react";
import { DataContext } from "./dataProvider";

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export default useData;