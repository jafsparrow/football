export interface EventItem {
  title: string;
  date?: Date;
  summary?: string;
  type?: string[];
  gameType?: string[];
  description?: string;
  contact?: {};
  mainClub?: ClubInfo;
}

export class ClubInfo {
  name: string;
  id: string;
}
