// Definition of the action types used in the data context

import { Team } from "../../models/team";
import { Template } from "../../models/template";

export enum ActionType {
  LOADING,
  SUCCESS,
  ERROR,
  GET_TEMPLATES_BY_ID,
  GET_TEMPLATES_BY_TEXT,
  GET_TEMPLATES_BY_TEAMS,
  GET_TEAMS_BY_USER,
}

export interface ActionPayload {
  type: ActionType,
  dispatchType: DispatchType,
  apiName?: ActionType,
  payload?: PayloadType
}

export enum DispatchType
{
  TEMPLATE,
  TEAM
}

export type PayloadType =
    Template
  | Template[]
  | Team[]
  | string;
