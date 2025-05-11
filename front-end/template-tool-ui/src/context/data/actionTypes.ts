// Definition of the action types used in the data context

import { Team } from "../../models/team";
import { Template, TempTemplate } from "../../models/template";
import { User } from "../../models/user";

export enum ActionType {
  LOADING,
  SUCCESS,
  ERROR,
  GET_TEMPLATES_BY_ID,
  GET_TEMPLATES_BY_TEXT,
  GET_TEMPLATES_BY_TEAMS,
  GET_TEAMS_BY_USER,
  GET_USER_DETAILS
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
  TEAM,
  USER
}

export type PayloadType =
    Template
  | Template[]
  | TempTemplate[]
  | Team[]
  | User
  | string;
