export interface TempTemplate {
  id: number;
  title: string;
  detail: string;
  content: string
  ownerId: number;
  teamId: number;
  editable: boolean;
  lastAmendDate: string;
}

export interface Template {
  id: number;
  title: string;
  detail: string;
  content: string
  ownerId: number;
  teamId: number;
  editable: boolean;
  lastAmendDate: Date;
}

export interface TemplateWithTeamName extends Template {
  teamName: string;
}