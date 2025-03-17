// Team API Calls via Axios
// dispatch goes to the reducer to update the state

import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { ActionPayload, actionTypes, DispatchType } from '../actionTypes';
import { API_ROUTES } from '../../../constants/apis';

const dispatchTeamAction = (dispatch: Dispatch<ActionPayload>, action: Omit<ActionPayload, 'dispatchType'>) => {
  dispatch({ ...action, dispatchType: DispatchType.TEAM });
};

export const getTeamsByUserId = async (userId: number, dispatch: Dispatch<ActionPayload>) => {
  dispatchTeamAction(dispatch, { type: actionTypes.LOADING });
  try {
    const response: AxiosResponse = await axios.get(API_ROUTES.GET_TEAMS_BY_USER(userId), {
      timeout: 3000
    });
    if (response.status === 200) {
      dispatchTeamAction(dispatch, { type: actionTypes.SUCCESS, apiName: actionTypes.GET_TEAMS_BY_USER, payload: response.data });
    } else {
      throw new Error(`Failed to get template with id: ${userId}`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTeamAction(dispatch, { type: actionTypes.ERROR, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
      dispatchTeamAction(dispatch, { type: actionTypes.ERROR, payload: `Something went wrong: ${error.message}` });
    } else {
      dispatchTeamAction(dispatch, { type: actionTypes.ERROR, payload: 'An unknown error occurred' });
    }
  }
};