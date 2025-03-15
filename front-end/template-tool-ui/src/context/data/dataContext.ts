// used for creating the data context

import { createContext } from "react";
import { INITIAL_TEMPLATE_STATE } from "./initialState";
import { ActionPayload } from "./actionTypes";
import { TemplateState } from "./reducers/templateReducer";


const INITIAL_STATE = {
  templateState: INITIAL_TEMPLATE_STATE,
}

export type StateTypes = {
  templateState: TemplateState;
}

export const DataStateContext = createContext<StateTypes>(INITIAL_STATE);
export const DataDispatchContext = createContext<((action: ActionPayload) => void) | undefined>(undefined);