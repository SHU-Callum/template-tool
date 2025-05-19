export interface Team {
  id: number
  teamName: string;
  ownerIds: number[];
  members: string[];
}

export interface TeamAffiliations extends Team {
  isOwner: boolean;
}