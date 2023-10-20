import {ApplicationConfig} from '@angular/core';
import {provideBooks} from './book/book.config';
import {provideRouter, Routes, withComponentInputBinding} from "@angular/router";
import {NotFoundComponentComponent} from "./core/components/not-found-component/not-found-component.component";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {bookRoutes} from "./book/book.routes";
import {API_VERSION} from "./core/api-version.token";
import {jwtTokenInterceptor} from "./core/jwt-token.interceptor";


const routes: Routes = [
  ...bookRoutes,
  {path: '', redirectTo: '/book', pathMatch: 'full'},

  {path: '**', component: NotFoundComponentComponent}
];
export const appConfig: ApplicationConfig = {
  providers: [
    provideBooks(),
    provideRouter(routes,
      withComponentInputBinding(),
      // withDebugTracing()
    ),
    provideHttpClient(
      withInterceptors([jwtTokenInterceptor])
    ),
    {provide: API_VERSION, useValue: 'api'}
  ]
};
