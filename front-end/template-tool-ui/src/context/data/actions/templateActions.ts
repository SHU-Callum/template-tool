// Template API Calls via Axios
// dispatch goes to the reducer to update the state

import axios, {AxiosResponse} from 'axios';
import {Dispatch} from 'react';
import { ActionPayload, actionTypes } from '../actionTypes';
import { API_ROUTES } from '../../../constants/apis';

export const getTemplateById = async (templateId: number, dispatch: Dispatch<ActionPayload>) => {
  dispatch({ type: actionTypes.LOADING });
  try {
    const response: AxiosResponse = await axios.get(API_ROUTES.GET_TEMPLATE_URL(templateId), {
      timeout: 3000
    });
    if (response.status === 200) {
      dispatch({ type: actionTypes.SUCCESS, apiName: actionTypes.GET_TEMPLATES_BY_ID, payload: response.data });
    }
    else {
      throw new Error(`Failed to get template with id: ${templateId}`);
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

export const getTemplatesByText = async (text: string, dispatch: Dispatch<ActionPayload>) => {
  dispatch({ type: actionTypes.LOADING });
  try {
    const response: AxiosResponse = await axios.get(API_ROUTES.GET_TEMPLATES_BY_SEARCH(text));
    if (response.status === 200) {
      dispatch({ type: actionTypes.SUCCESS, apiName: actionTypes.GET_TEMPLATES_BY_TEXT, payload: response.data });
    }
    else if (response.status === 400) {
      dispatch({ type: actionTypes.ERROR, payload: response.data });
    }
    else {
      throw new Error(`Failed to get template with id: ${text}`);
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      dispatch({ type: actionTypes.ERROR, payload: 'Timeout Error' });
    }
    else if (axios.isAxiosError(error)) {
      console.log(error);
      dispatch({ type: actionTypes.ERROR, payload: `${error.response?.data.error}: Error Code ${error.response?.status}` });
    }
    else {
      dispatch({ type: actionTypes.ERROR, payload: 'An unknown error occurred' });
    }
  }
}