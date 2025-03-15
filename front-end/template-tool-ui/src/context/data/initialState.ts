import { Template } from "../../models/template";
import { TemplateState } from "./reducers/templateReducer";

export const INITIAL_TEMPLATE_STATE: TemplateState = {
  templateById: null as Template | null,
  templatesByText: [] as Template[] | null,
  loading: false,
  error: null,
};