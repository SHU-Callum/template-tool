// Template Reducer for the data context
// Used to update the state based on the API calls

import { ActionPayload, ActionType } from "../actionTypes";
import { Template, TempTemplate } from "../../../models/template";
import { mysqlDatetimeToDate } from "../../../utils/dateFormatter";

export interface TemplateState {
  templatesByTeams: Template[] | null;
  templatesByParams: Template[] | null;
  createTemplate: Template | null;
  updateTemplate: Template | null;
  deleteTemplate: number | null;
  resetCreateTemplate: () => void;
  resetUpdateTemplate: () => void;
  resetDeleteTemplate: () => void;
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
        case ActionType.GET_TEMPLATES_BY_TEAMS:
          if (Array.isArray(action.payload)) {
            return {
              ...state,
              loading: false,
              error: null,
              templatesByParams: null,
              templatesByTeams: (action.payload as TempTemplate[]).map(template => ({
                ...template,
                lastAmendDate: mysqlDatetimeToDate(template.lastAmendDate), // convert to Date object
              })),
            };
          } else {
            return {
              ...state,
              loading: false,
              error: "Invalid format received from server - Not an array of templates",
            };
          }
        case ActionType.GET_TEMPLATES_BY_PARAMS:
          if (Array.isArray(action.payload)) {
            return {
              ...state,
              loading: false,
              error: null,
              templatesByTeams: null,
              templatesByParams: (action.payload as TempTemplate[]).map(template => ({
                ...template,
                lastAmendDate: mysqlDatetimeToDate(template.lastAmendDate), // convert to Date object
              })),
            };
          } else {
            return {
              ...state,
              loading: false,
              error: "Invalid format received from server - Not an array of templates",
            };
          }
        case ActionType.CREATE_TEMPLATE:
          const createdTemplate = {
              ...(action.payload as TempTemplate),
              lastAmendDate: mysqlDatetimeToDate((action.payload as TempTemplate).lastAmendDate), // convert to Date object
            }
            return {
            ...state,
            loading: false,
            error: null,
            createTemplate: createdTemplate,
            templatesByTeams: state.templatesByTeams
              ? [...state.templatesByTeams, createdTemplate]
              : [createdTemplate],
            };
        case ActionType.UPDATE_TEMPLATE:
          const updatedTemplate = {
              ...(action.payload as TempTemplate),
              lastAmendDate: mysqlDatetimeToDate((action.payload as TempTemplate).lastAmendDate), // convert to Date object
            }
          return {
            ...state,
            loading: false,
            error: null,
            updateTemplate: updatedTemplate,
            templatesByTeams: state.templatesByTeams
              ? state.templatesByTeams.map(template =>
                  template.id === (action.payload as TempTemplate).id
                    ? updatedTemplate
                    : template
                )
              : null,
            templatesByParams: state.templatesByParams
              ? state.templatesByParams.map(template =>
                  template.id === (action.payload as TempTemplate).id
                    ? updatedTemplate
                    : template
                )
              : null,
          };
        case ActionType.DELETE_TEMPLATE:
          const deletedTemplateId = (action.payload as number);
          return {
            ...state,
            loading: false,
            error: null,
            deleteTemplate: deletedTemplateId,
            templatesByTeams: state.templatesByTeams
              ? state.templatesByTeams.filter(template => template.id !== deletedTemplateId)
              : null,
            templatesByParams: state.templatesByParams
              ? state.templatesByParams.filter(template => template.id !== deletedTemplateId)
              : null,
          };
        default:
          return state;
      }
    case ActionType.RESET_CREATE_TEMPLATE:
      return {
        ...state,
        createTemplate: null,
      };
    case ActionType.RESET_UPDATE_TEMPLATE:
      return {
        ...state,
        updateTemplate: null,
      };
    case ActionType.RESET_DELETE_TEMPLATE:
      return {
        ...state,
        deleteTemplate: null,
      };
    case ActionType.ERROR:
      switch (action.apiName) {
        case ActionType.GET_TEMPLATES_BY_PARAMS:
          return {
            ...state,
            loading: false,
            error: action.payload as string,
            templatesByTeams: null,
            templatesByParams: [],
          };
        default:
          return {
            ...state,
            loading: false,
            error: action.payload as string,
          };
        }
    default:
      return state;
  }
};

export default templateReducer;