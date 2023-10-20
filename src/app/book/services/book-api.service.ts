import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model";


@Injectable({providedIn: 'root'})
export class BookApiService {

  httpClient = inject(HttpClient);

  findAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`/api/book`);
  }

  findOne(bookId: number): Observable<Book> {
    return this.httpClient.get<Book>(`/api/book/${bookId}`);
  }
  findByTitle(title: string): Observable<Book[]> {
    const params = new HttpParams();
    const paramsWithTitle = params.append('title_like',title);

    return this.httpClient.get<Book[]>(`/api/book`, {params:paramsWithTitle});
  }

  saveBook(book:Book){
    return this.httpClient.put<Book>(`/api/book/${book.id}`, book);
  }
}
