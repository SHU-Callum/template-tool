// used for providing the data context to the app

import { useReducer, ReactNode, useCallback, useMemo } from "react";
import { DataDispatchContext, DataStateContext } from "./dataContext";
import { INITIAL_TEAM_STATE, INITIAL_TEMPLATE_STATE, INITIAL_USER_STATE } from "./initialState";
import templateReducer from "./reducers/templateReducer";
import { ActionPayload, DispatchType } from "./actionTypes";
import teamReducer from "./reducers/teamReducer";
import userReducer from "./reducers/userReducer";


const DataProvider = ({children}: { children: ReactNode }) => {
  const [templateState, templateDispatch] = useReducer(templateReducer, INITIAL_TEMPLATE_STATE);
  const [teamState, teamDispatch] = useReducer(teamReducer, INITIAL_TEAM_STATE);
  const [userState, userDispatch] = useReducer(userReducer, INITIAL_USER_STATE);

  const combinedState = useMemo(
    () => ({
      templateState,
      teamState,
      userState
    }),
    [ // Dependencies
      templateState,
      teamState,
      userState
    ]
  );

  const combinedDispatch = useCallback((action: ActionPayload) => {
    switch (action.dispatchType) {
      case DispatchType.TEMPLATE:
        templateDispatch(action);
        break;
      case DispatchType.TEAM:
        teamDispatch(action);
        break;
      case DispatchType.USER:
        userDispatch(action);
        break;
    }
  }, [templateDispatch, teamDispatch, userDispatch]);

  return (
    <DataDispatchContext.Provider value={combinedDispatch}>
      <DataStateContext.Provider value={combinedState}>
        {children}
      </DataStateContext.Provider>
    </DataDispatchContext.Provider>
  );
};

export { DataProvider, DataDispatchContext, DataStateContext };