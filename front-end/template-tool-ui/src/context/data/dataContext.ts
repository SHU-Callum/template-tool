import { createContext } from "react";
import { Template } from "../../models/template";

interface State {
  templateById: Template | null;
  TemplatesByText: Template[] | null;
  loading: boolean;
  error: string | null;
}

export const DataContext = createContext<{
  state: State;
  getTemplateById: (templateId: number) => void;
  getTemplatesByText: (text: string) => void;
  } | undefined>(undefined);