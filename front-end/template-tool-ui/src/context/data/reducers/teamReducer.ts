// Team Reducer for the data context
// Used to update the state based on the API calls

import { ActionPayload, actionTypes } from "../actionTypes";
import { Team } from "../../../models/team";

export interface TeamState {
  teamsByUser: Team[] | null;
  loading: boolean;
  error: string | null;
}

const teamReducer = (state: TeamState, action: ActionPayload): TeamState => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SUCCESS:
      switch (action.apiName) {
        case actionTypes.GET_TEAMS_BY_USER:
          return {
            ...state,
            loading: false,
            error: null,
            teamsByUser: action.payload as Team[],
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

export default teamReducer;