// Definition of the action types used in the data context

import { Team } from "../../models/team";
import { Template } from "../../models/template";

export const actionTypes = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  GET_TEMPLATES_BY_ID: 'GET_TEMPLATES_BY_ID',
  GET_TEMPLATES_BY_TEXT: 'GET_TEMPLATES_BY_TEXT',
  GET_TEAMS_BY_USER: 'GET_TEAMS_BY_USER',
};

export interface ActionPayload {
  type: string,
  apiName?: string,
  payload?: PayloadType
}

export type PayloadType =
    Template
  | Template[]
  | Team[]
  | string;