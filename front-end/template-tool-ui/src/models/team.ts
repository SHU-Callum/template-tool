export interface Team {
  id: number
  name: string;
  ownerId: number;
  members: string[];
}

export interface TeamAffiliations extends Team {
  isOwner: boolean;
}