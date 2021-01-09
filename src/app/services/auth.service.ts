import { environment } from './../../environments/environment';
import { Pengelola } from './../model/pengelola.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser:Pengelola;
  constructor(private http:HttpClient, private router:Router) { }

  onRegisterPengelola(pengelola:Pengelola, pengelolaKEY:string){
    return this.http.post(`${environment.endpoint}/pengelola`,{
      pengelolaNAMA1:pengelola.pengelolaNAMA1,
      pengelolaNAMA2:pengelola.pengelolaNAMA2,
      pengelolaEMAIL:pengelola.pengelolaEMAIL,
      pengelolaPASSWORD:pengelola.pengelolaPASSWORD,
      pengelolaKEY:pengelolaKEY
    },{
      headers:{Authorization:environment.apiKey}
    })
  }

  onLoginPengelola(email:string,password:string){
    return this.http.post(`${environment.endpoint}/pengelola/login`,{
      pengelolaEMAIL:email,
      pengelolaPASSWORD:password
    },{
      headers:{Authorization:environment.apiKey}
    })
  }

  onLogout(){
    localStorage.clear();
    this.loggedInUser = null;
    this.router.navigate(['/login']);
  }
}
