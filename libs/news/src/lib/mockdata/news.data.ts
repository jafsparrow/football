import { News } from "../modals/news";

export const sampleMockNews: News[] = [
  {
    title: 'Sample News title',
    summary: 'sample news summary',
    image: 'https://picsum.photos/200/300/?random',
    content: 'hello content',
    createdDate: new Date(),
    relatedSports: {football: true},
    taggedClubs: [],
    mainClub: {name:'liverpool', logoUrl: ''}
  },
  {
    title: 'Sample News title',
    summary: 'sample news summary',
    image: 'https://via.placeholder.com/350x150',
    content: 'hello content',
    createdDate: new Date(),
    relatedSports: {football: true},
    taggedClubs: [],
    mainClub: {name:'chelsea', logoUrl: ''}
  },
  {
    title: 'Sample News title',
    summary: 'sample news summary',
    image: 'https://picsum.photos/200/300/?random',
    content: 'hello content',
    createdDate: new Date(),
    relatedSports: {football: true},
    taggedClubs: [],
    mainClub: {name:'Manchester city', logoUrl: ''}
  },
  {
    title: 'Sample News title',
    summary: 'sample news summary',
    image: 'https://via.placeholder.com/350x150',
    content: 'hello content',
    createdDate: new Date(),
    relatedSports: {football: true},
    taggedClubs: [],
    mainClub: {name:'watford', logoUrl: ''}
  },
  {
    title: 'Sample News title',
    summary: 'sample news summary',
    image: '',
    content: 'hello content',
    createdDate: new Date(),
    relatedSports: {football: true},
    taggedClubs: [],
    mainClub: {name:'Manchester city', logoUrl: ''}
  }
]

