export interface params {
  id: string;
}

export interface coach {
  _id: string;
  username: string;
  teamId: undefined | string;
}

export interface team {
  _id: string;
  name: string;
}

export interface tender {
  _id: string;
  sender: string;
  coachId: coach;
  salary: number;
  teamId: team | undefined;
  date: string;
  seasonsDuration: number;
  contractPlan: string;
  terminationFine: number;
}

export interface tendersOption {
  _id: string;
  tendersId: tender;
  method: string;
}

export interface editValues {
  salary: number | undefined;
  seasonsDuration: number | undefined;
  contractPlan: string | undefined;
  terminationFine: number | undefined;
}