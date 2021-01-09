import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  errMsg:string;
  loading:boolean;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email:new FormControl(null,Validators.required),
      pass:new FormControl(null,Validators.required)
    })
  }

  onLogin(){
    this.errMsg = null;
    this.loading = true;
    this.authService.onLoginPengelola(this.loginForm.value.email,this.loginForm.value.pass).subscribe((res:any)=>{
      console.log(res);
      this.loading = false;
      if(res.data){
        localStorage.setItem('pengelola',JSON.stringify(res.data));
        this.router.navigateByUrl('/');
      }else{
        this.errMsg = res.messages[0];
      }
    },err=>{
      this.loading = false;
      this.errMsg = 'Check your network and try again';
    })
  }

}
