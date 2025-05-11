import { Template } from "../../models/template";
import { TemplateState } from "./reducers/templateReducer";
import { Team } from "../../models/team";
import { TeamState } from "./reducers/teamReducer";
import { User } from "../../models/user";

export const INITIAL_TEMPLATE_STATE: TemplateState = {
  templateById: null as Template | null,
  templatesByText: [] as Template[] | null,
  loading: false,
  error: null,
  templatesByTeams: null
};

export const INITIAL_TEAM_STATE: TeamState = {
  teamsByUser: null as Team[] | null,
  loading: false,
  error: null,
};

export const INITIAL_USER_STATE = {
  userDetails: null as User | null,
  loading: false,
  error: null,
};