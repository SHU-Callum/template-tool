// Team API Calls via Axios
// dispatch goes to the reducer to update the state

import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { ActionPayload, ActionType, DispatchType } from '../actionTypes';
import { API_ROUTES } from '../../../constants/apis';
import { encrypt } from '../../../utils/encryption';

const dispatchTeamAction = (dispatch: Dispatch<ActionPayload>, action: Omit<ActionPayload, 'dispatchType'>) => {
  dispatch({ ...action, dispatchType: DispatchType.TEAM });
};

export const getTeamsByUserId = async (userId: number, dispatch: Dispatch<ActionPayload>) => {
  dispatchTeamAction(dispatch, { type: ActionType.LOADING });
  try {
    const response: AxiosResponse = await axios.get(API_ROUTES.GET_TEAMS_BY_USER(encrypt(userId.toString())), {
      timeout: 3000
    });
    if (response.status === 200) {
      dispatchTeamAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.GET_TEAMS_BY_USER, payload: response.data });
    } else {
      throw new Error(`Failed to get template with id: ${userId}`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTeamAction(dispatch, { type: ActionType.ERROR, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
      dispatchTeamAction(dispatch, { type: ActionType.ERROR, payload: `Something went wrong: ${error.message}` });
    } else {
      dispatchTeamAction(dispatch, { type: ActionType.ERROR, payload: 'An unknown error occurred' });
    }
  }
};