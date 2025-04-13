import { RemirrorContentType } from "remirror";

export interface Template {
  id: number;
  title: string;
  detail: string;
  content: RemirrorContentType
  ownerId: number;
  teamId: number;
  editable: boolean;
  lastAmendDate: Date;
}

export interface TemplateWithTeamName extends Template {
  teamName: string;
}