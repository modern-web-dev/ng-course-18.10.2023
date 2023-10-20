import {ApplicationConfig} from '@angular/core';
import {provideBooks} from './book/book.config';
import {provideRouter, Routes, withComponentInputBinding, withDebugTracing} from "@angular/router";
import {BookOverviewComponent} from "./book/components/book-overview/book-overview.component";
import {BookDetailsComponent} from "./book/components/book-details/book-details.component";
import {NotFoundComponentComponent} from "./core/not-found-component/not-found-component.component";
import {provideHttpClient} from "@angular/common/http";
import {onlyForLoggedIdGuard} from "./core/guards/only-for-logged-in.guard";
import {booksResolver} from "./book/services/books.resolver";
import {bookResolver} from "./book/services/book.resolver";

const routes: Routes = [
  {
    path: 'book', component: BookOverviewComponent, resolve: {
      books: booksResolver
    }
  },
  {path: 'book/:id', component: BookDetailsComponent, resolve: {book: bookResolver}, canActivate: [onlyForLoggedIdGuard]},
  {path: '', redirectTo: '/book', pathMatch: 'full'},

  {path: '**', component: NotFoundComponentComponent}
];
export const appConfig: ApplicationConfig = {
  providers: [provideBooks(),
    provideRouter(routes,
      withComponentInputBinding(),
      // withDebugTracing()
    ),
    provideHttpClient()
  ]
};
