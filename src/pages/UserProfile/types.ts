export interface teamId {
  _id: string;
  name: string;
  pictureUrl: string;
}

export interface activeContract {
  teamId: teamId;
  initialDate: string;
  salary: number;
  seasonsDuration: number;
  terminationFine: number;
}

export interface career {
  teamId: teamId;
  initialDate: string;
  finalDate: string;
}

export interface ProfessionData {
  profession: string;
  userId: string;
  username: string;
  description: string;
  countryImage: string;
  activeContract: activeContract;
  career: Array<career>;
}

export interface params {
  id: string;
}
