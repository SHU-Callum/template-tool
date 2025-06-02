import { Template } from "../../models/template";
import { TemplateState } from "./reducers/templateReducer";
import { Team } from "../../models/team";
import { TeamState } from "./reducers/teamReducer";
import { User } from "../../models/user";
import { TeamMember } from "../../models/teamMember";

export const INITIAL_TEMPLATE_STATE: TemplateState = {
  templatesByTeams: null as Template[] | null,
  templatesByParams: null as Template[] | null,
  createTemplate: null as Template | null,
  updateTemplate: null as Template | null,
  deleteTemplate: null as number | null,
  resetCreateTemplate: () => ({}), // will be replaced in DataProvider
  resetUpdateTemplate: () => ({}), // will be replaced in DataProvider
  resetDeleteTemplate: () => ({}), // will be replaced in DataProvider
  loading: false,
  error: null,
};

export const INITIAL_TEAM_STATE: TeamState = {
  teamsByUser: null as Team[] | null,
  membersByTeam: null as TeamMember[] | null,
  promotion: false,
  resetPromotion: () => ({}), // will be replaced in DataProvider
  loading: false,
  error: null,
};

export const INITIAL_USER_STATE = {
  userDetails: null as User | null,
  loading: false,
  error: null,
};