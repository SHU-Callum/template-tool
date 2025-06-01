// Team Reducer for the data context
// Used to update the state based on the API calls

import { ActionPayload, ActionType } from "../actionTypes";
import { Team } from "../../../models/team";
import { TeamMember } from "../../../models/teamMember";

export interface TeamState {
  teamsByUser: Team[] | null;
  membersByTeam: TeamMember[] | null;
  loading: boolean;
  error: string | null;
}

const teamReducer = (state: TeamState, action: ActionPayload): TeamState => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.SUCCESS:
      switch (action.apiName) {
        case ActionType.GET_TEAMS_BY_USER:
          return {
            ...state,
            loading: false,
            error: null,
            teamsByUser: action.payload as Team[],
          };
        case ActionType.GET_NAMES_BY_TEAM:
          return {
            ...state,
            loading: false,
            error: null,
            membersByTeam: action.payload as TeamMember[],
          };
        default:
          return state;
        }
    case ActionType.ERROR:
      switch (action.apiName) {
        case ActionType.GET_TEAMS_BY_USER:
          return {
            ...state,
            loading: false,
            error: action.payload as string,
            teamsByUser: [],
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

export default teamReducer;