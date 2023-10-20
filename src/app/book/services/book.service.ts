import {Book} from '../model';
import {BehaviorSubject, map, Observable, Subject, tap} from 'rxjs';
import {Injectable} from "@angular/core";


export class BookService {
  private idSeq = 0;
  private booksSubject = new BehaviorSubject<Book[]>([
    {
      id: ++this.idSeq,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: ++this.idSeq,
      author: 'Victor Savkin',
      title: 'Angular Router'
    },
    {
      id: ++this.idSeq,
      author: 'John Smith',
      title: 'Angular for Nerds'
    }
  ]);

  findAll(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  findOne(bookId: number): Observable<Book> {
    return this.booksSubject.pipe(
      map((books) => books.filter(book => book.id === bookId)[0]),
      tap((data) => console.log(`Sukces: ${data}`), (data) => console.log(`Error: ${data}`))
    )
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
