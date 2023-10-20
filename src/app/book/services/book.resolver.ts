import {ResolveFn, Router} from '@angular/router';
import {Book} from "../model";
import {inject} from "@angular/core";
import {BookApiService} from "./book-api.service";
import {catchError, throwError} from "rxjs";

export const bookResolver: ResolveFn<Book> = (route) => {
  const router = inject(Router);
  let bookIdAsString = route.params['id'];
  const bookId = +bookIdAsString;
  if (isNaN(bookId)) {
    setTimeout(() => router.navigate(['book', 'new']))
    return  throwError(() => new Error(`Could not parse ${bookIdAsString} as Book ID`))
  } else {
    return inject(BookApiService).findOne(bookId)
      .pipe(
        catchError((err) => {
          setTimeout(() => router.navigate(['book', 'new']))
          return throwError(() => err)
        })
      );
  }
};
