import { environment } from './../../environments/environment';
import { Kegiatan } from './../model/kegiatan.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KegiatanService {

  constructor(private http:HttpClient, private snackbar:MatSnackBar ) { }

  loadKegiatan = new Subject<Kegiatan[]>();

  getAllKegiatan(){
    this.http.get(`${environment.endpoint}/kegiatan`,{
      headers:{
        Authorization:environment.apiKey
      }
    }).subscribe((res:any)=>{
      if(res.success && res.data){
        this.loadKegiatan.next(res.data);
      }else{
        this.snackbar.open('Failed to fetchd data','Dismiss!',{duration:3000});
      }
    },err=>{
      this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
    })
  }

  getAllKegiatanForOptions(){
    return this.http.get(`${environment.endpoint}/kegiatan`,{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  getSingleKegiatan(eventKODE:string){
    return this.http.get(`${environment.endpoint}/kegiatan/${eventKODE}`,{
      headers:{Authorization:environment.apiKey}
    });
  }

  addKegiatan(kegiatan:Kegiatan){
    return this.http.post(`${environment.endpoint}/kegiatan`,{
      eventKODE:kegiatan.eventKODE,
      eventNAMA:kegiatan.eventNAMA,
      eventKET:kegiatan.eventKET,
      eventPOSTER:kegiatan.eventPOSTER,
      eventMULAI:kegiatan.eventMULAI,
      eventSELESAI:kegiatan.eventSELESAI
    },{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  updateKegiatan(kegiatan:Kegiatan,eventKODE:string){
    return this.http.put(`${environment.endpoint}/kegiatan/${eventKODE}`,{
      eventKODE:kegiatan.eventKODE,
      eventNAMA:kegiatan.eventNAMA,
      eventKET:kegiatan.eventKET,
      eventPOSTER:kegiatan.eventPOSTER,
      eventMULAI:kegiatan.eventMULAI,
      eventSELESAI:kegiatan.eventSELESAI
    },{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  deleteKegiatan(eventKODE:string){
    return this.http.delete(`${environment.endpoint}/kegiatan/${eventKODE}`,{
      headers:{Authorization:environment.apiKey}
    });
  }
}
