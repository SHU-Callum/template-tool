export interface Team {
  id: number
  teamName: string;
  ownerIds: number[];
}

export interface TeamAffiliations extends Team {
  isOwner: boolean;
}