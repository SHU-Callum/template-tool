// used for creating the data context

import { createContext } from "react";
import { INITIAL_TEAM_STATE, INITIAL_TEMPLATE_STATE, INITIAL_USER_STATE } from "./initialState";
import { ActionPayload } from "./actionTypes";
import { TemplateState } from "./reducers/templateReducer";
import { TeamState } from "./reducers/teamReducer";
import { UserState } from "./reducers/userReducer";


const INITIAL_STATE = {
  templateState: INITIAL_TEMPLATE_STATE,
  teamState: INITIAL_TEAM_STATE,
  userState: INITIAL_USER_STATE,
}

export type StateTypes = {
  userState: UserState;
  templateState: TemplateState;
  teamState: TeamState
}

export const DataStateContext = createContext<StateTypes>(INITIAL_STATE);
export const DataDispatchContext = createContext<((action: ActionPayload) => void) | undefined>(undefined);