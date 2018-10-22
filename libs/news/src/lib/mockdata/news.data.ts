import { News } from "../modals/news";

export const sampleMockNews: News[] = [
  {
    id: '68rWtCP9EJ2rTpJxgtkH',
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
    id: '68rWtCP9EJ2rTpJxgtkH',
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
    id: '6vno4N3nADX8hrrw6jSe',
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
    id: 'UQxYRqXCarsUn5RrtcaO',
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
    id: 'CXMuwLvqLDGXbee6CoHP',
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

