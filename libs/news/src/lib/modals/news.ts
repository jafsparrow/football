export class News {
  title: string;
  createdDate: Date;
  publishedDate?: Date;
  author?: string;
  summary: String;
  content: string;
  relatedSports: {};
  taggedClubs: ClubMeta[]
  image?: string | any;

}

export class ClubMeta {
  clubName: string;
  clubId: string;
}
