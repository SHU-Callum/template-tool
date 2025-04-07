// Template Reducer for the data context
// Used to update the state based on the API calls

import { ActionPayload, ActionType } from "../actionTypes";
import { Template } from "../../../models/template";

export interface TemplateState {
  templateById: Template | null;
  templatesByText: Template[] | null
  templatesByTeams: Template[] | null;
  loading: boolean;
  error: string | null;
}

const templateReducer = (state: TemplateState, action: ActionPayload): TemplateState => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.SUCCESS:
      switch (action.apiName) {
        case ActionType.GET_TEMPLATES_BY_ID:
          return {
            ...state,
            loading: false,
            error: null,
            templateById: action.payload as Template,
            templatesByText: null,
            templatesByTeams: null,
          };
        case ActionType.GET_TEMPLATES_BY_TEXT:
          return {
            ...state,
            loading: false,
            error: null,
            templateById: null,
            templatesByText: action.payload as Template[],
            templatesByTeams: null,
          };
        case ActionType.GET_TEMPLATES_BY_TEAMS:
          return {
            ...state,
            loading: false,
            error: null,
            templateById: null,
            templatesByText: null,
            templatesByTeams: action.payload as Template[],
          };
        default:
          return state;
        }
    case ActionType.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    default:
      return state;
  }
};

export default templateReducer;