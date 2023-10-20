import {ResolveFn} from '@angular/router';
import {Book} from "../model";
import {BookApiService} from "./book-api.service";
import {inject} from "@angular/core";

export const booksResolver: ResolveFn<Book[]> = (route, state) => {
  return inject(BookApiService).findAll();
};
//
// export class BooksResolver implements Resolve<Book[]>{
//   constructor(private readonly bookApiService: BookApiService){
//   }
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[]> | Promise<Book[]> | Book[] {
//     return this.bookApiService.findAll();
//   }
// }
