import {Book} from '../model';

export class BookService {
  private books: Book[] = [
    {
      id: 0,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: 1,
      author: 'Victor Savkin',
      title: 'Angular Router'
    },
    {
      id: 2,
      author: 'John Smith',
      title: 'Angular for Nerds'
    }
  ];

  constructor() {
    console.log('new BookService()');
  }

  findAll(): Promise<Book[]> {
    return new Promise<Book[]>(
      resolve => setTimeout(() => resolve(this.books), 2000)
    );
  }
}
