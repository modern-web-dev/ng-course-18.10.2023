import {inject} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book, NewBook} from "../model";


export class BookApiService {

  httpClient = inject(HttpClient);

  findAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`/api/book`);
  }

  findOne(bookId: number): Observable<Book> {
    return this.httpClient.get<Book>(`/api/book/${bookId}`);
  }

  findByTitle(title: string | null): Observable<Book[]> {
    let params = new HttpParams();
    if (title) {
      params = params.append('title_like', title);
    }

    return this.httpClient.get<Book[]>(`/api/book`, {params});
  }

  saveBook(book: Book) {
    return this.httpClient.put<Book>(`/api/book/${book.id}`, book);
  }

  addBook(book: NewBook) {
    return this.httpClient.post<Book>(`/api/book`, book);
  }
}
