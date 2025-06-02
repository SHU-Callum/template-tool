// Definition of the action types used in the data context

import { Team } from "../../models/team";
import { TeamMember } from "../../models/teamMember";
import { Template, TempTemplate } from "../../models/template";
import { User } from "../../models/user";

export enum ActionType {
  LOADING,
  SUCCESS,
  ERROR,
  GET_TEMPLATES_BY_TEAMS,
  GET_TEMPLATES_BY_PARAMS,
  UPDATE_TEMPLATE,
  RESET_UPDATE_TEMPLATE,
  DELETE_TEMPLATE,
  RESET_DELETE_TEMPLATE,
  CREATE_TEMPLATE,
  RESET_CREATE_TEMPLATE,
  GET_TEAMS_BY_USER,
  GET_NAMES_BY_TEAM,
  GET_USER_DETAILS,
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
  | TempTemplate
  | TempTemplate[]
  | Team[]
  | User
  | TeamMember[]
  | string
  | number;
