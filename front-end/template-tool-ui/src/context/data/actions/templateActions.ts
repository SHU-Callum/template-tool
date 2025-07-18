// Template API Calls via Axios
// dispatch goes to the reducer to update the state

import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { ActionPayload, ActionType, DispatchType } from '../actionTypes';
import { API_ROUTES } from '../../../constants/apis';
import { encryptParameter } from '../../../utils/encryption';
import authorisedAxios from '../../../utils/authTokenPrep';
import { TemplateSearchParams } from '../../../types/templateSearchParams';
import { TempTemplate } from '../../../models/template';

// Sets dispatch type to TEMPLATE for all actions
const dispatchTemplateAction = (dispatch: Dispatch<ActionPayload>, action: Omit<ActionPayload, 'dispatchType'>) => {
  dispatch({ ...action, dispatchType: DispatchType.TEMPLATE });
};

export const getTemplatesByTeams = async (teamIds: number[], dispatch: Dispatch<ActionPayload>) => {
  dispatchTemplateAction(dispatch, { type: ActionType.LOADING });
  try {
    const { encryptedParameter, iv } = encryptParameter(JSON.stringify(teamIds)); // Need to encrypt twice due to API handling in Springboot
    const response: AxiosResponse = await authorisedAxios.get(API_ROUTES.GET_TEMPLATES_BY_TEAMS(encodeURIComponent(encryptedParameter)), {
      headers: {
        'encryption-iv': iv // each api call has a different encryption pattern
      },
      timeout: 3000
    });
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
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: `${error.response?.data.error}: Error Code ${error.response?.status}` });
    } else {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'An unknown error occurred' });
    }
  }
};

export const getTemplatesByParams = async (teamIdsParam: number[], searchtextParam: string, includeViewOnlyParam: boolean, dispatch: Dispatch<ActionPayload>) => {
  dispatchTemplateAction(dispatch, { type: ActionType.LOADING });
  const params: TemplateSearchParams = {
    searchText: searchtextParam,
    teamIds: teamIdsParam,
    includeViewOnly: includeViewOnlyParam
  };
  try {
    const { encryptedParameter, iv } = encryptParameter(JSON.stringify(params)); // Need to encrypt twice due to API handling in Springboot
    const response: AxiosResponse = await authorisedAxios.get(API_ROUTES.GET_TEMPLATES_BY_PARAMS(encodeURIComponent(encryptedParameter)), {
      headers: {
        'encryption-iv': iv // each api call has a different encryption pattern
      },
      timeout: 3000
    });
    if (response.status === 200) {
      dispatchTemplateAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.GET_TEMPLATES_BY_PARAMS, payload: response.data });
    } else if (response.status === 400) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: response.data });
    } else {
      throw new Error(`Failed to get user templates`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
        if (error.status === 404) {
          dispatchTemplateAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.GET_TEMPLATES_BY_PARAMS, payload: `No templates found matching criteria` });
        }
        else {
          dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: `${error.response?.data.error}: Error Code ${error.response?.status}` });
        }
    } else {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'An unknown error occurred' });
    }
  }
};

export const updateTemplate = async (newTemplate: TempTemplate, dispatch: Dispatch<ActionPayload>) => {
  dispatchTemplateAction(dispatch, { type: ActionType.LOADING });
  try {
    const templateId = newTemplate.id.toString();
    const { encryptedParameter, iv } = encryptParameter(JSON.stringify(newTemplate));
    const response: AxiosResponse = await authorisedAxios.put(API_ROUTES.UPDATE_TEMPLATE(templateId), encryptedParameter, {
      headers: {
        'encryption-iv': iv // each api call has a different encryption pattern
      },
      timeout: 3000
    });
    if (response.status === 200) {
      dispatchTemplateAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.UPDATE_TEMPLATE, payload: response.data });
    } else if (response.status === 400) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: response.data });
    } else {
      throw new Error(`Failed to save template`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
        if (error.status === 404) {
            dispatchTemplateAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.UPDATE_TEMPLATE, payload: `Couldn't find template to update` });
        }
        else {
          dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: `${error.response?.data.error}: Error Code ${error.response?.status}` });
        }
    } else {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'An unknown error occurred' });
    }
  }
}

export const createTemplate = async (newTemplate: TempTemplate, dispatch: Dispatch<ActionPayload>) => {
  dispatchTemplateAction(dispatch, { type: ActionType.LOADING });
  try {
    const { encryptedParameter, iv } = encryptParameter(JSON.stringify(newTemplate));
    const response: AxiosResponse = await authorisedAxios.post(API_ROUTES.CREATE_TEMPLATE, encryptedParameter, {
      headers: {
      'Content-Type': 'text/plain',
      'encryption-iv': iv // each api call has a different encryption pattern
      },
      timeout: 3000
    });
    if (response.status === 201) {
      dispatchTemplateAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.CREATE_TEMPLATE, payload: response.data });
    } else if (response.status === 400) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: response.data });
    } else {
      throw new Error(`Failed to save template`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
          dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: `${error.response?.data.error}: Error Code ${error.response?.status}` });
    } else {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'An unknown error occurred' });
    }
  }
}

export const deleteTemplate = async (templateToDelete: number, dispatch: Dispatch<ActionPayload>) => {
  dispatchTemplateAction(dispatch, { type: ActionType.LOADING });
  try {
    const templateId = templateToDelete.toString();
    const response: AxiosResponse = await authorisedAxios.delete(API_ROUTES.DELETE_TEMPLATE(templateId), {
      timeout: 3000
    });
    if (response.status === 200) {
      dispatchTemplateAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.DELETE_TEMPLATE, payload: response.data });
    } else if (response.status === 400) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: response.data });
    } else {
      throw new Error(`Failed to delete template`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
        if (error.status === 404) {
            dispatchTemplateAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.UPDATE_TEMPLATE, payload: `Couldn't find template to delete` });
        }
        else {
          dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: `${error.response?.data.error}: Error Code ${error.response?.status}` });
        }
    } else {
      dispatchTemplateAction(dispatch, { type: ActionType.ERROR, payload: 'An unknown error occurred' });
    }
  }
};