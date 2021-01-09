import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jarak } from '../model/jarak.model';

@Injectable({
  providedIn: 'root'
})
export class JarakService {


  constructor(private http:HttpClient,private snackbar:MatSnackBar) { }

  loadJarak = new Subject<Jarak[]>();

  getAllJarakObyek(){
    this.http.get(`${environment.endpoint}/jarakobyek`,{
      headers:{
        Authorization:environment.apiKey
      }
    }).subscribe((res:any)=>{
      if(res.success && res.data){
        this.loadJarak.next(res.data)
      }else{
        this.snackbar.open(`Failed to fetch data`,'Dismiss!',{duration:3000});
      }
    },err=>{
      this.snackbar.open('Check your network and try again','Dismiss!')
    })
  }

  getSingleJarakObyek(obyekKODEasal:string,obyekKODEtujuan:string){
    return this.http.get(`${environment.endpoint}/jarakobyek/${obyekKODEasal}/${obyekKODEtujuan}`,{
      headers:{
        Authorization:environment.apiKey
      }
    });
  }

  addJarakObyek(jarak:Jarak){
    return this.http.post(`${environment.endpoint}/jarakobyek`,{
      obyekKODEasal:jarak.obyekKODEasal,
      obyekKODEtujuan:jarak.obyekKODEtujuan,
      obyekjarak:jarak.obyekjarak,
      obyektempuh:jarak.obyektempuh,
      obyekRUTE:jarak.obyekRUTE
    },{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  updateJarakObyek(jarak:Jarak,obyekKODEasal:string,obyekKODEtujuan:string){
    return this.http.put(`${environment.endpoint}/jarakobyek/${obyekKODEasal}/${obyekKODEtujuan}`,{
      obyekKODEasal:jarak.obyekKODEasal,
      obyekKODEtujuan:jarak.obyekKODEtujuan,
      obyekjarak:jarak.obyekjarak,
      obyektempuh:jarak.obyektempuh,
      obyekRUTE:jarak.obyekRUTE
    },{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  deleteJarakObyek(obyekKODEasal:string,obyekKODEtujuan:string){
    return this.http.delete(`${environment.endpoint}/jarakobyek/${obyekKODEasal}/${obyekKODEtujuan}`,{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

}
