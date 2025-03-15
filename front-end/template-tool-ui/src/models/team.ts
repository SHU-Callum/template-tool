export interface Team {
  name: string;
  ownerId: number;
  members: string[];
}

export interface TeamAffiliations extends Team {
  isOwner: boolean;
}