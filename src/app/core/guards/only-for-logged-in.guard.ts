import {CanActivateFn, Router,} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const onlyForLoggedIdGuard: CanActivateFn = () => {
  return inject(AuthService).isLoggedIn() || inject(Router).parseUrl('/book');
};


// export class OnlyForLoggedInGuard implements CanActivate{
//   constructor(private readonly authService:AuthService) {
//   }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     return this.authService.isLoggedId();
//   }
// }
