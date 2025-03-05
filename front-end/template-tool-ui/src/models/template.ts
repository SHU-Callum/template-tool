export interface Template {
  id: number;
  title: string;
  detail: string;
  content: string
  owner_id: number;
  team_id: number;
  editable: boolean;
  last_amend_date: Date;
}