import { Pengelola } from './../../model/pengelola.model';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  errMsg:string ;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      pengelolaNAMA1:new FormControl(null,Validators.required),
      pengelolaNAMA2:new FormControl(null,Validators.required),
      pengelolaEMAIL:new FormControl(null,Validators.required),
      pengelolaPASSWORD:new FormControl(null,Validators.required),
      pengelolaKONFIRMASI:new FormControl(null,Validators.required),
      pengelolaKEY:new FormControl(null,Validators.required)
    });
  }

  onRegister(){
    if(this.registerForm.value.pengelolaPASSWORD === this.registerForm.value.pengelolaKONFIRMASI){
      const pengelola:Pengelola={
        pengelolaEMAIL:this.registerForm.value.pengelolaEMAIL,
        pengelolaNAMA1:this.registerForm.value.pengelolaNAMA1,
        pengelolaNAMA2:this.registerForm.value.pengelolaNAMA2,
        pengelolaPASSWORD:this.registerForm.value.pengelolaPASSWORD
      };
      this.authService.onRegisterPengelola(pengelola,this.registerForm.value.pengelolaKEY).subscribe((res:any)=>{
        console.log()
        if(res.success && res.data){
          console.log(res.data);
          localStorage.setItem('pengelola',JSON.stringify(res.data));
          this.router.navigateByUrl('/');
        }else{
          this.errMsg = res.messages[0];
        }
      },err=>{
        this.errMsg = 'Email has been used';
      })
    }else{
      this.errMsg = 'Confirmation password not match';
    }
  }

}
