import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClubManagementGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$.pipe(
      take(1),
      map(user => {
        if (this.auth.isClubManagementUser(user)) return true;
        return false;
      })
    );

    // return this.auth.user$.pipe(
    //   take(1),
    //   tap(user => {
    //     if (user) {
    //       console.log(`user from man guard `)
    //       console.log(user);
    //       return true;
    //       if(!this.auth.isClubManagementUser(user)) {
    //         console.log('the logged user does not have club management permission - from management auth guard')
    //         this.router.navigate(['/login']);
    //       }
    //       return true;
    //     } else {
    //       console.log('is it from here?')
    //       return false;
    //     }

    // }),
    // )
  }
}
