export class News {
  title: string;
  summary: String;
  content: string;
  isActive?: boolean;
  createdDate: Date;
  publishedDate?: Date;
  author?: NewsAuthor;
  mainClub?: MainClub;
  relatedSports: {};
  taggedClubs: ClubMeta[]
  image?: string | any;
  status?: string;
}

export class ClubMeta {
  name: string;
  id: string;
}

export class NewsAuthor {
  name?: string;
  uid?: string;
  photoUrl?: string;
}

export class MainClub {
  name?: string;
  id?: string;
  logoUrl: string;
}

