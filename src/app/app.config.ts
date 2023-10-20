import {ApplicationConfig} from '@angular/core';
import {provideBooks} from './book/book.config';
import {provideRouter, Routes, withComponentInputBinding, withDebugTracing} from "@angular/router";
import {NotFoundComponentComponent} from "./core/components/not-found-component/not-found-component.component";
import {provideHttpClient} from "@angular/common/http";
import {bookRoutes} from "./book/book.routes";


const routes: Routes = [
  ...bookRoutes,
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
