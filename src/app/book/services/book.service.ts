import {Book} from '../model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([
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
  ]);

  findAll(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  search(query: string): Observable<string[]> {
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next([`${query}-1`, `${query}-2`, `${query}-3`]);
        subscriber.complete();
      }, 1000);
    })
  }

  updateBook(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const bookCopy = {...bookToUpdate};
      const currentBooks = this.booksSubject.value
      const newBooks = currentBooks.map(
        book => book.id === bookToUpdate.id ? bookCopy : book);
      subscriber.next(bookCopy);
      subscriber.complete();

      this.booksSubject.next(newBooks);
    });
  }
}
