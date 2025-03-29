// used for creating the data context

import { createContext } from "react";
import { INITIAL_TEAM_STATE, INITIAL_TEMPLATE_STATE } from "./initialState";
import { ActionPayload } from "./actionTypes";
import { TemplateState } from "./reducers/templateReducer";
import { TeamState } from "./reducers/teamReducer";


const INITIAL_STATE = {
  templateState: INITIAL_TEMPLATE_STATE,
  teamState: INITIAL_TEAM_STATE,
}

export type StateTypes = {
  templateState: TemplateState;
  teamState: TeamState
}

export const DataStateContext = createContext<StateTypes>(INITIAL_STATE);
export const DataDispatchContext = createContext<((action: ActionPayload) => void) | undefined>(undefined);