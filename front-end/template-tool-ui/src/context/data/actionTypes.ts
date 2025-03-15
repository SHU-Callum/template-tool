// Definition of the action types used in the data context

import { Template } from "../../models/template";

export const actionTypes = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  GET_TEMPLATES_BY_ID: 'GET_TEMPLATES_BY_ID',
  GET_TEMPLATES_BY_TEXT: 'GET_TEMPLATES_BY_TEXT',
};

export interface ActionPayload {
  type: string,
  apiName?: string,
  payload?: PayloadType
}

export type PayloadType =
    Template
  | Template[]
  | string;