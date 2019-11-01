// ANGULAR
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';

// RXJS
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// MAIN
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap((data) => this.authService.updateUser(data.user)),
        map((data) => {
          if (data.is_authenticated) {
            return true;
          } else {
            this.router.navigateByUrl('/auth');
          }
          return (data.is_authenticated) ? true : false;
        })
      );
  }
}
