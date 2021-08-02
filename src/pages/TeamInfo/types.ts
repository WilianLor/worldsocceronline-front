export interface RouteParams {
  id: string;
}

export interface interest {
  _id: string;
  coachId: string;
}

interface player {
  firstName: string;
  lastName: string;
  position: number;
  overall: number;
  age: number;
  transferAmount: number;
}

interface coach {
    coachId: string;
}

export interface TeamInfoType {
  _id: string;
  name: string;
  pictureUrl: string;
  countryPictureUrl: string;
  president: {
    _id: string;
    name: string;
    countryPictureUrl: string;
  };
  coach: {
    _id: string;
    name: string;
    countryPictureUrl: string;
  };
  players: [player];
  interestedCoaches: [coach];
  sponsorship: {
    name: string;
    pictureUrl: string;
  };
  stadium: {
    _id: string;
    name: string;
    capacityLevel: 0;
    city: string;
  };
  nacionalCompetition: {
    _id: string;
    name: string;
    pictureUrl: string;
    state: string;
  };
  regionalCompetition: {
    _id: string;
    name: string;
    pictureUrl: string;
    state: string;
  };
}
