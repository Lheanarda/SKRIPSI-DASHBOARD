import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private authService:AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const loggedIn = localStorage.getItem('pengelola') ? true : false;
      if(loggedIn){
        this.authService.loggedInUser = JSON.parse(localStorage.getItem('pengelola'));
        return true;
      }else{
        this.router.navigateByUrl('/login');
        return false;
      }
  }
}
