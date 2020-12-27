import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Berita } from './../model/berita.model';
import { Injectable } from '@angular/core';
import { BeritaFoto } from '../model/beritafoto.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeritaService {

  constructor(private http:HttpClient,private snackbar:MatSnackBar) { }

  loadBerita = new Subject<Berita[]>();
  uploadIndicator = new Subject<any>();

  getAllBerita(){
    this.http.get(`${environment.endpoint}/berita`,{
      headers:{
        Authorization:environment.apiKey
      }
    }).subscribe((res:any)=>{
      if(res.success){
        const data:Berita[] = res.data;
        this.loadBerita.next(data);
      }else{
        this.snackbar.open('Failed to Fetch Data','Dismiss!',{duration:3000});
      }
    })
  }


  getSingleBerita(beritaKODE:string){
    return this.http.get(`${environment.endpoint}/berita/${beritaKODE}`,{
      headers:{Authorization:environment.apiKey}
    })
  }

  addBerita(berita:Berita){
    return this.http.post(`${environment.endpoint}/berita`,{
      beritaKODE:berita.beritaKODE,
      beritaJUDUL:berita.beritaJUDUL,
      beritaISI:berita.beritaISI,
      beritaGAMBAR:berita.beritaGAMBAR,
      beritaTGL:berita.beritaTGL,
      beritaSUMBER:berita.beritaSUMBER,
      kategoriberitaKODE:berita.kategoriberitaKODE,
      eventKODE:berita.eventKODE,
      kabupatenKODE:berita.kabupatenKODE
    },{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  updateBerita(berita:Berita,beritaKODE:string){
    return this.http.put(`${environment.endpoint}/berita/${beritaKODE}`,{
      beritaKODE:berita.beritaKODE,
      beritaJUDUL:berita.beritaJUDUL,
      beritaISI:berita.beritaISI,
      beritaGAMBAR:berita.beritaGAMBAR,
      beritaTGL:berita.beritaTGL,
      beritaSUMBER:berita.beritaSUMBER,
      kategoriberitaKODE:berita.kategoriberitaKODE,
      eventKODE:berita.eventKODE,
      kabupatenKODE:berita.kabupatenKODE
    },{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  deleteBerita(beritaKODE:string){
    return this.http.delete(`${environment.endpoint}/berita/${beritaKODE}`,{
      headers:{Authorization:environment.apiKey}
    });
  }
}
