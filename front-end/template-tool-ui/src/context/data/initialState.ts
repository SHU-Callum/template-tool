import { Template } from "../../models/template";
import { TemplateState } from "./reducers/templateReducer";
import { Team } from "../../models/team";
import { TeamState } from "./reducers/teamReducer";

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