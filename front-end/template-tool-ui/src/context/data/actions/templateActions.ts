// Template API Calls via Axios
// dispatch goes to the reducer to update the state

import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { ActionPayload, ActionType, DispatchType } from '../actionTypes';
import { API_ROUTES } from '../../../constants/apis';
import { encrypt } from '../../../utils/encryption';

const dispatchTemplateAction = (dispatch: Dispatch<ActionPayload>, action: Omit<ActionPayload, 'dispatchType'>) => {
  dispatch({ ...action, dispatchType: DispatchType.TEMPLATE });
};

// TODO: Implement the following function
export const getTemplateById = async (templateId: number, dispatch: Dispatch<ActionPayload>) => {
  dispatchTemplateAction(dispatch, { type: ActionType.LOADING });
  try {
    const response: AxiosResponse = await axios.get(API_ROUTES.GET_TEMPLATE_URL(templateId), {
      timeout: 3000
    });
    if (response.status === 200) {
      dispatchTemplateAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.GET_TEMPLATES_BY_ID, payload: response.data });
    } else {
      throw new Error(`Failed to get template with id: ${templateId}`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: `Something went wrong: ${error.message}` });
    } else {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'An unknown error occurred' });
    }
  }
};

export const getTemplatesByText = async (text: string, dispatch: Dispatch<ActionPayload>) => {
  dispatchTemplateAction(dispatch, { type: ActionType.LOADING });
  try {
    const response: AxiosResponse = await axios.get(API_ROUTES.GET_TEMPLATES_BY_SEARCH(text));
    if (response.status === 200) {
      dispatchTemplateAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.GET_TEMPLATES_BY_TEXT, payload: response.data });
    } else if (response.status === 400) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: response.data });
    } else {
      throw new Error(`Failed to get template with id: ${text}`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
      console.log(error);
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: `${error.response?.data.error}: Error Code ${error.response?.status}` });
    } else {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'An unknown error occurred' });
    }
  }
};

export const getTemplatesByTeams = async (teamIds: number[], dispatch: Dispatch<ActionPayload>) => {
  dispatchTemplateAction(dispatch, { type: ActionType.LOADING });
  try {
    const response: AxiosResponse = await axios.get(API_ROUTES.GET_TEMPLATES_BY_TEAMS(encrypt(JSON.stringify(teamIds))));
    if (response.status === 200) {
      dispatchTemplateAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.GET_TEMPLATES_BY_TEAMS, payload: response.data });
    } else if (response.status === 400) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: response.data });
    } else {
      throw new Error(`Failed to get user templates`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
      console.log(error);
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: `${error.response?.data.error}: Error Code ${error.response?.status}` });
    } else {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'An unknown error occurred' });
    }
  }
};