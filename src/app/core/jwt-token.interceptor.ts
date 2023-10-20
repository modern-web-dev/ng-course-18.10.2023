import {
  HttpRequest, HttpEvent, HttpInterceptorFn, HttpHandlerFn
} from '@angular/common/http';
import {Observable} from 'rxjs';

const token = 'testowy token';
// @Injectable()
// export class JwtTokenInterceptor implements HttpInterceptor {
//
//   constructor() {}
//
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const newRequest = request.clone({setHeaders:{'Authorisation': `Bearer ${token}`}})
//     return next.handle(newRequest);
//   }
// }

export const jwtTokenInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const newRequest = request.clone({setHeaders: {'Authorisation': `Bearer ${token}`}})
  return next(newRequest);
}
