import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | import("rxjs").Observable<boolean | UrlTree> | 
  Promise<boolean | UrlTree> {
    return !this.token.loggedIn();
  }

  constructor( private token:TokenService) { }
}
