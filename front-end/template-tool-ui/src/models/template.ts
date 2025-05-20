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

// Used for converting MySQL date to typescript date
export interface TempTemplate extends Omit<Template, 'lastAmendDate'> {
  lastAmendDate: string;
}

export interface TemplateWithTeamName extends Template {
  teamName: string;
}