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

export interface TempTemplate extends Omit<Template, 'lastAmendDate'> {
  lastAmendDate: string;
}

export interface TemplateWithTeamName extends Template {
  teamName: string;
}