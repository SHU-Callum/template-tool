import { actionTypes } from "./actionTypes";
import { Template } from "../../models/template";

interface State {
  templateById: Template | null;
  TemplatesByText: Template[] | null
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  templateById: null as Template | null,
  TemplatesByText: [] as Template[] | null,
  loading: false,
  error: null,
};

const templateReducer = (state: State, action: { type: string; apiName?: string; payload?: Template | Template[] | string}): State => {
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
            TemplatesByText: action.payload as Template[],
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