// Team API Calls via Axios
// dispatch goes to the reducer to update the state

import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { ActionPayload, ActionType, DispatchType } from '../actionTypes';
import { API_ROUTES } from '../../../constants/apis';
import { encryptParameter } from '../../../utils/encryption';
import authorisedAxios from '../../../utils/authTokenPrep';

// Sets dispatch type to TEAM for all actions
const dispatchTeamAction = (dispatch: Dispatch<ActionPayload>, action: Omit<ActionPayload, 'dispatchType'>) => {
  dispatch({ ...action, dispatchType: DispatchType.TEAM });
};

// Called at the start and when teams are amended
export const getTeamsByUserId = async (userId: number, dispatch: Dispatch<ActionPayload>) => {
  dispatchTeamAction(dispatch, { type: ActionType.LOADING });
  try {
    const { encryptedParameter, iv } = encryptParameter(userId.toString()); // Need to encrypt twice due to API handling in Springboot
    const response: AxiosResponse = await authorisedAxios.get(API_ROUTES.GET_TEAMS_BY_USER(encodeURIComponent(encryptedParameter)), {
      headers: {
        'encryption-iv': iv // each api call has a different encryption pattern
      },
      timeout: 3000
    });
    if (response.status === 200) {
      dispatchTeamAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.GET_TEAMS_BY_USER, payload: response.data });
    } else {
      throw new Error(`Failed to get template with id: ${userId}`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.GET_TEAMS_BY_USER, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
      if (error.status === 404) {
        dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.GET_TEAMS_BY_USER, payload: `No teams found for user` });
      }
      else {
        dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.GET_TEAMS_BY_USER, payload: `Something went wrong: ${error.message}` });
      }
    } else {
      dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.GET_TEAMS_BY_USER, payload: 'An unknown error occurred' });
    }
  }
};

// Called at Manage Team page
export const getMemberNamesByTeam = async (teamId: number, dispatch: Dispatch<ActionPayload>) => {
  dispatchTeamAction(dispatch, { type: ActionType.LOADING });
  try {
    const { encryptedParameter, iv } = encryptParameter(teamId.toString()); // Need to encrypt twice due to API handling in Springboot
    const response: AxiosResponse = await authorisedAxios.get(API_ROUTES.GET_MEMBERS_BY_TEAM(encodeURIComponent(encryptedParameter)), {
      headers: {
        'encryption-iv': iv // each api call has a different encryption pattern
      },
      timeout: 3000
    });
    if (response.status === 200) {
      dispatchTeamAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.GET_NAMES_BY_TEAM, payload: response.data });
    } else {
      throw new Error(`Failed to get team members with team id: ${teamId}`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.GET_NAMES_BY_TEAM, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
      if (error.status === 404) {
        dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.GET_NAMES_BY_TEAM, payload: `No users found for team` });
      }
      else {
        dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.GET_NAMES_BY_TEAM, payload: `Something went wrong: ${error.message}` });
      }
    } else {
      dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.GET_NAMES_BY_TEAM, payload: 'An unknown error occurred' });
    }
  }
};

// Called at Manage Team page
export const promoteTeamMember = async (memberId: number, teamId: number, dispatch: Dispatch<ActionPayload>) => {
  dispatchTeamAction(dispatch, { type: ActionType.LOADING });
  try {
    const promotion = {
      userId: memberId,
      teamId: teamId
    };
    const { encryptedParameter, iv } = encryptParameter(JSON.stringify(promotion)); 
    const response: AxiosResponse = await authorisedAxios.put(API_ROUTES.UPDATE_MEMBER_PERMISSION, encryptedParameter, {
      headers: {
        'encryption-iv': iv // each api call has a different encryption pattern
      },
      timeout: 3000
    });
    if (response.status === 200) {
      dispatchTeamAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.UPDATE_MEMBER_PERMISSION, payload: response.data });
    } else {
      throw new Error(`Failed to update member id: ${memberId} for team id: ${teamId}`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.UPDATE_MEMBER_PERMISSION, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
      if (error.status === 404) {
        dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.UPDATE_MEMBER_PERMISSION, payload: `User not found for team` });
      }
      else {
        dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.UPDATE_MEMBER_PERMISSION, payload: `Something went wrong: ${error.message}` });
      }
    } else {
      dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.UPDATE_MEMBER_PERMISSION, payload: 'An unknown error occurred' });
    }
  }
};

// Called at Manage Team page
export const addTeamMember = async (email: string, teamId: number, dispatch: Dispatch<ActionPayload>) => {
  dispatchTeamAction(dispatch, { type: ActionType.LOADING });
  try {
    const newUser = {
      email: email,
      teamId: teamId
    };
    const { encryptedParameter, iv } = encryptParameter(JSON.stringify(newUser)); 
    const response: AxiosResponse = await authorisedAxios.post(API_ROUTES.ADD_TEAM_MEMBER, encryptedParameter, {
      headers: {
        'Content-Type': 'text/plain',
        'encryption-iv': iv // each api call has a different encryption pattern
      },
      timeout: 3000
    });
    if (response.status === 200) {
      dispatchTeamAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.ADD_TEAM_MEMBER, payload: response.data });
    } else {
      throw new Error(`Failed to add new team member: ${email}`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.ADD_TEAM_MEMBER, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
      if (error.status === 404) {
        dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.ADD_TEAM_MEMBER, payload: `User does not exist` });
      }
      else {
        dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.ADD_TEAM_MEMBER, payload: error.response?.data ?? `Something went wrong: ${error.message}` });
      }
    } else {
      dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.ADD_TEAM_MEMBER, payload: 'An unknown error occurred' });
    }
  }
};

// Called at Side Out
export const createTeam = async (teamName: string, userId: number, dispatch: Dispatch<ActionPayload>) => {
  dispatchTeamAction(dispatch, { type: ActionType.LOADING });
  try {
    const newTeam = {
      teamName: teamName,
      ownerId: userId
    };
    const { encryptedParameter, iv } = encryptParameter(JSON.stringify(newTeam)); 
    const response: AxiosResponse = await authorisedAxios.post(API_ROUTES.CREATE_TEAM, encryptedParameter, {
      headers: {
        'Content-Type': 'text/plain',
        'encryption-iv': iv // each api call has a different encryption pattern
      },
      timeout: 3000
    });
    if (response.status === 201) {
      dispatchTeamAction(dispatch, { type: ActionType.SUCCESS, apiName: ActionType.CREATE_TEAM, payload: response.data });
    } else {
      throw new Error(`Failed to create new team: ${teamName}`);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.CREATE_TEAM, payload: 'Timeout Error' });
    } else if (axios.isAxiosError(error)) {
      if (error.status === 404) {
        dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.CREATE_TEAM, payload: `User does not exist` });
      }
      else {
        dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.CREATE_TEAM, payload: error.response?.data ?? `Something went wrong: ${error.message}` });
      }
    } else {
      dispatchTeamAction(dispatch, { type: ActionType.ERROR, apiName: ActionType.CREATE_TEAM, payload: 'An unknown error occurred' });
    }
  }
};