import { Pengelola } from './../../model/pengelola.model';
import { AuthService } from './../../services/auth.service';
import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  navigationState;
  pengelola:Pengelola;

  constructor(private breakpointObserver: BreakpointObserver, private navService:NavigationService, private authService:AuthService) {}

  ngOnInit(){
    this.navigationState = this.navService.navigationState;
    this.pengelola = this.authService.loggedInUser;
  }

  onLogout(){
    this.authService.onLogout();
  }

}
