// User API Calls via Axios
// dispatch goes to the reducer to update the state

import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { ActionPayload, ActionType, DispatchType } from '../actionTypes';
import { API_ROUTES } from '../../../constants/apis';
import { encryptParameter } from '../../../utils/encryption';
import authorisedAxios from '../../../utils/authTokenPrep';

// Sets dispatch type to TEAM for all actions
const dispatchUserAction = (dispatch: Dispatch<ActionPayload>, action: Omit<ActionPayload, 'dispatchType'>) => {
  dispatch({ ...action, dispatchType: DispatchType.USER });
};

// Called at the start and when teams are amended
export const getUserDetails = async (keycloakId: string, dispatch: Dispatch<ActionPayload>) => {
  dispatchUserAction(dispatch, { type: ActionType.LOADING });
  try {
    const { encryptedParameter, iv } = encryptParameter(keycloakId.toString()); // Need to encrypt twice due to API handling in Springboot
    const response: AxiosResponse = await authorisedAxios.get(API_ROUTES.GET_USER_DETAILS(encodeURIComponent(encryptedParameter)), {
      headers: {
        'encryption-iv': iv // each api call has a different encryption pattern
      },
      timeout: 3000
    });
    if (response.status === 200) {
      dispatchUserAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.GET_USER_DETAILS, payload: response.data });
    } else {
      throw new Error(`Failed to get template with keycloak id: ${keycloakId}`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchUserAction(dispatch, { type: ActionType.ERROR, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error) && error) {
      if (error.code === 'ERR_NETWORK') {
        dispatchUserAction(dispatch, { type: ActionType.ERROR, payload: 'Network Error: Server is unreachable' });
      } else if (error.status === 401 && error.config?.headers['Refreshed']) {
        dispatchUserAction(dispatch, { type: ActionType.ERROR, payload: 'Bad Request' });
      }else {
        dispatchUserAction(dispatch, { type: ActionType.ERROR, payload: `Something went wrong: ${error.message}` });
      }
    } 
    else {
      console.error('Unknown error:', error);
      dispatchUserAction(dispatch, { type: ActionType.ERROR, payload: 'An unknown error occurred' });
    }
  }
};