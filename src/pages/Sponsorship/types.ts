export interface SponsorshipType {
  _id: string;
  name: string;
  value: number;
  type: "ticket" | "performance";
  level: number;
  pictureUrl: string;
}

export interface ResponseData {
  haveSponsorship: boolean;
  sponsorships: [SponsorshipType]
}
