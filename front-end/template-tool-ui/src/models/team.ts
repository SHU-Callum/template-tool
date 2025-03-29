export interface Team {
  id: number
  teamName: string;
  ownerId: number;
  members: string[];
}

export interface TeamAffiliations extends Team {
  isOwner: boolean;
}