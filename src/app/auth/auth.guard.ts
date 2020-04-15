import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
   
    console.log(`AuthGuard#canActivate called`);
    let url: string = state.url;
    
    return this.checkLogin(url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return this.canActivate(next, state);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    // Store the attempt URL for redirecting
    this.authService.redirectUrl = url;

    // Create a dummy/fake session id
    let sessionId = 123456789;

    // Set our navigation extras object
    // which contains out global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'      
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }
  

}
