// User Reducer for the data context
// Used to update the state based on the API calls

import { User } from "../../../models/user";
import { ActionPayload, ActionType } from "../actionTypes";

export interface UserState {
  userDetails: User | null;
  loading: boolean;
  error: string | null;
}

const userReducer = (state: UserState, action: ActionPayload): UserState => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.SUCCESS:
      switch (action.apiName) {
        case ActionType.GET_USER_DETAILS:
          return {
            ...state,
            loading: false,
            error: null,
            userDetails: action.payload as User,
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

export default userReducer;