import {ApplicationConfig} from '@angular/core';
import {provideBooks} from './book/book.config';
import {provideRouter, Routes, withComponentInputBinding, withDebugTracing} from "@angular/router";
import {BookOverviewComponent} from "./book/components/book-overview/book-overview.component";
import {BookService} from "./book/services/book.service";
import {BookDetailsComponent} from "./book/components/book-details/book-details.component";
import {NotFoundComponentComponent} from "./core/not-found-component/not-found-component.component";
import {provideHttpClient} from "@angular/common/http";

const routes: Routes = [
  {path: 'book', component: BookOverviewComponent},
  {path: 'book/:id', component: BookDetailsComponent},
  {path: '', redirectTo: '/book', pathMatch:'full'},

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
