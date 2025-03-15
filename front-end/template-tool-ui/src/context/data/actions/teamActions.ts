// Team API Calls via Axios
// dispatch goes to the reducer to update the state

import axios, {AxiosResponse} from 'axios';
import {Dispatch} from 'react';
import { ActionPayload, actionTypes } from '../actionTypes';
import { API_ROUTES } from '../../../constants/apis';

export const getTeamsByUserId = async (userId: number, dispatch: Dispatch<ActionPayload>) => {
  dispatch({ type: actionTypes.LOADING });
  try {
    const response: AxiosResponse = await axios.get(API_ROUTES.GET_TEAMS_BY_USER(userId), {
      timeout: 3000
    });
    if (response.status === 200) {
      dispatch({ type: actionTypes.SUCCESS, apiName: actionTypes.GET_TEAMS_BY_USER, payload: response.data });
    }
    else {
      throw new Error(`Failed to get template with id: ${userId}`);
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      dispatch({ type: actionTypes.ERROR, payload: 'Timeout Error' });
    }
    else if (axios.isAxiosError(error)) {
      dispatch({ type: actionTypes.ERROR, payload: `Something went wrong: ${error.message}` });
    }
    else {
      dispatch({ type: actionTypes.ERROR, payload: 'An unknown error occurred' });
    }
  }
}