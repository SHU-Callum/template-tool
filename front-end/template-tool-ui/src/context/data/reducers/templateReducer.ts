// Template Reducer for the data context
// Used to update the state based on the API calls

import { ActionPayload, actionTypes } from "../actionTypes";
import { Template } from "../../../models/template";

export interface TemplateState {
  templateById: Template | null;
  templatesByText: Template[] | null
  loading: boolean;
  error: string | null;
}

const templateReducer = (state: TemplateState, action: ActionPayload): TemplateState => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SUCCESS:
      switch (action.apiName) {
        case actionTypes.GET_TEMPLATES_BY_ID:
          return {
            ...state,
            loading: false,
            error: null,
            templateById: action.payload as Template,
          };
        case actionTypes.GET_TEMPLATES_BY_TEXT:
          return {
            ...state,
            loading: false,
            error: null,
            templatesByText: action.payload as Template[],
          };
        default:
          return state;
        }
    case actionTypes.ERROR:
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