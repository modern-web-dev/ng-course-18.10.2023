import {inject} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book, NewBook} from "../model";
import {API_VERSION} from "../../core/api-version.token";

export class BookApiService {

  httpClient = inject(HttpClient);
  apiVersion = inject(API_VERSION);


  findAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`/${this.apiVersion}/book`);
  }

  findOne(bookId: number): Observable<Book> {
    return this.httpClient.get<Book>(`/${this.apiVersion}/book/${bookId}`);
  }

  findByTitle(title: string | null): Observable<Book[]> {
    let params = new HttpParams();
    if (title) {
      params = params.append('title_like', title);
    }

    return this.httpClient.get<Book[]>(`/${this.apiVersion}/book`, {params});
  }

  saveBook(book: Book) {
    return this.httpClient.put<Book>(`/${this.apiVersion}/book/${book.id}`, book);
  }

  addBook(book: NewBook) {
    return this.httpClient.post<Book>(`/${this.apiVersion}/book`, book);
  }
}
