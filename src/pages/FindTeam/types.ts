export interface Info {
  profession: string;
  teamId: string;
  professionId: string;
  token: string;
}

export interface region {
  _id: string;
  name: string;
  mainRegionalCompetitionName: string;
  secondaryRegionalCompetitionName: string;
  __v: number;
}

export interface country {
  _id: string;
  name: string;
  pictureUrl: string;
}

export interface league {
  _id: string;
  name: string;
  pictureUrl: string;
}

export interface team {
  _id: string;
  name: string;
  pictureUrl: string;
}

export interface player {
  _id: string;
  firstName: string;
  lastName: string;
  overall: number;
  position: string;
  age: number;
}

export interface interest {
  _id: string;
  coachId: string;
}
