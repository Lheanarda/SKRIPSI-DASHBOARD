import { environment } from './../../environments/environment';
import { FasilitasObyek } from './../model/fasilitas-obyek.model';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FasilitasObyekService {

  constructor(private http:HttpClient,private snackbar:MatSnackBar) { }
  loadFasilitasObyek = new Subject<FasilitasObyek[]>();

  getAllFasilitasObyek(){
    this.http.get(`${environment.endpoint}/fasilobyek`,{
      headers:{
        Authorization:environment.apiKey
      }
    }).subscribe((res:any)=>{
      if(res.success && res.data){
        this.loadFasilitasObyek.next(res.data);
      }else{
        this.snackbar.open(`Failed to fetch data`,'Dismiss!',{duration:3000});
      }
    },err=>{
      this.snackbar.open('Check your network and try again','Dismiss!')
    })
  }

  getSingleFasilitasObyek(fasilitasKODE:string,obyekKODE:string){
    return this.http.get(`${environment.endpoint}/fasilobyek/${fasilitasKODE}/${obyekKODE}`,{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  addFasilitasObyek(fasilObyek:FasilitasObyek){
    return this.http.post(`${environment.endpoint}/fasilobyek`,{
      fasilitasKODE:fasilObyek.fasilitasKODE,
      obyekKODE:fasilObyek.obyekKODE,
      fasilitasobyekKET:fasilObyek.fasilitasobyekKET
    },{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  updateFasilitasObyek(fasilObyek:FasilitasObyek,fasilitasKODE:string,obyekKODE:string){
    return this.http.put(`${environment.endpoint}/fasilobyek/${fasilitasKODE}/${obyekKODE}`,{
      fasilitasKODE:fasilObyek.fasilitasKODE,
      obyekKODE:fasilObyek.obyekKODE,
      fasilitasobyekKET:fasilObyek.fasilitasobyekKET
    },{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  deleteFasilitasObyek(fasilitasKODE:string,obyekKODE:string){
    return this.http.delete(`${environment.endpoint}/fasilobyek/${fasilitasKODE}/${obyekKODE}`,{
      headers:{
        Authorization:environment.apiKey
      }
    });
  }
}
