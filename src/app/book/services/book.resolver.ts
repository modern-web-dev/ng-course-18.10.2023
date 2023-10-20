import {ResolveFn, Router} from '@angular/router';
import {Book} from "../model";
import {inject} from "@angular/core";
import {BookApiService} from "./book-api.service";
import {catchError} from "rxjs";

export const bookResolver: ResolveFn<Book> = (route) => {
  const bookId = +route.paramMap.get('id')!;
  const router = inject(Router);
  return inject(BookApiService).findOne(bookId)
    .pipe(
      catchError((err) => {
        router.navigate(['book']);
        throw err;
      })
    );
};
