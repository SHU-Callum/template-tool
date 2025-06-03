// Team Reducer for the data context
// Used to update the state based on the API calls

import { ActionPayload, ActionType } from "../actionTypes";
import { Team } from "../../../models/team";
import { TeamMember } from "../../../models/teamMember";

export interface TeamState {
  teamsByUser: Team[] | null;
  membersByTeam: TeamMember[] | null;
  promotion: boolean;
  resetPromotion: () => void; // will be replaced in DataProvider
  resetAddMember: () => void; // will be replaced in DataProvider
  addMember: TeamMember | null;
  loading: boolean;
  error: {
    teamsByUserError: string;
    membersByTeamError: string;
    promotionError: string;
    addMemberError: string
  } | null;
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
            promotion: false
          };
        case ActionType.UPDATE_MEMBER_PERMISSION:
          return {
            ...state,
            loading: false,
            error: null,
            membersByTeam: action.payload as TeamMember[],
            promotion: true
          };
        case ActionType.ADD_TEAM_MEMBER:
          return {
            ...state,
            loading: false,
            error: null,
            addMember: action.payload as TeamMember,
          };
        default:
          return state;
        }
    case ActionType.RESET_PROMOTION:
      return {
        ...state,
        promotion: false,
      };
    case ActionType.RESET_ADD_MEMBER:
      return {
        ...state,
        addMember: null,
      };
    case ActionType.ERROR:
      switch (action.apiName) {
        case ActionType.GET_TEAMS_BY_USER:
          return {
            ...state,
            loading: false,
            error: {
              membersByTeamError: "",
              promotionError: "",
              addMemberError: "",
              teamsByUserError: action.payload as string,
            },
            teamsByUser: [],
          };
        case ActionType.GET_NAMES_BY_TEAM:
          return {
            ...state,
            loading: false,
            error: {
              teamsByUserError: "",
              promotionError: "",
              addMemberError: "",
              membersByTeamError: action.payload as string,
            },
            membersByTeam: [],
          };
        case ActionType.UPDATE_MEMBER_PERMISSION:
          return {
            ...state,
            loading: false,
            error: {
              teamsByUserError: "",
              membersByTeamError: "",
              addMemberError: "",
              promotionError: action.payload as string,
            },
          };
        case ActionType.ADD_TEAM_MEMBER:
          return {
            ...state,
            loading: false,
            error: {
              teamsByUserError: "",
              membersByTeamError: "",
              promotionError: "",
              addMemberError: action.payload as string,
            },
            addMember: null,
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default teamReducer;