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