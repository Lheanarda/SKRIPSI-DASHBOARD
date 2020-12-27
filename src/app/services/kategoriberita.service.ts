import { environment } from './../../environments/environment';
import { KategoriBerita } from './../model/kategori-berita.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KategoriberitaService {

  constructor(private http:HttpClient,private snackbar:MatSnackBar) { }

  loadKategoriBerita = new Subject<KategoriBerita[]>();

  getAllKategoriBerita(){
    this.http.get(`${environment.endpoint}/kategoriberita`,{
      headers:{Authorization:environment.apiKey}
    }).subscribe((res:any)=>{
      console.log(res);
      if(res.success && res.data.length>0){
        this.loadKategoriBerita.next(res.data);
      }else{
        this.snackbar.open(`Failed to fetch data`,'Dismiss!',{duration:3000});
      }
    },err=>{
      this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
    })
  }

  getAllKategoriBeritaForOptions(){
    return this.http.get(`${environment.endpoint}/kategoriberita`,{
      headers:{Authorization:environment.apiKey}
    });
  }

  getSingleKategoriBerita(kategoriberitaKODE:string){
    return this.http.get(`${environment.endpoint}/kategoriberita/${kategoriberitaKODE}`,{
      headers:{Authorization:environment.apiKey}
    });
  }

  addKategoriBerita(kategoriberita:KategoriBerita){
    return this.http.post(`${environment.endpoint}/kategoriberita`,{
      kategoriberitaKODE:kategoriberita.kategoriberitaKODE,
      kategoriberitaNAMA:kategoriberita.kategoriberitaNAMA,
      kategoriberitaKET:kategoriberita.kategoriberitaKET
    },{
      headers:{Authorization:environment.apiKey}
    })
  }

  updateKategoriBerita(kategoriberita:KategoriBerita,kategoriberitaKODE:string){
    return this.http.put(`${environment.endpoint}/kategoriberita/${kategoriberitaKODE}`,{
      kategoriberitaKODE:kategoriberita.kategoriberitaKODE,
      kategoriberitaNAMA:kategoriberita.kategoriberitaNAMA,
      kategoriberitaKET:kategoriberita.kategoriberitaKET
    },{
      headers:{Authorization:environment.apiKey}
    })
  }

  deleteKategoriBerita(kategoriberitaKODE:string){
    return this.http.delete(`${environment.endpoint}/kategoriberita/${kategoriberitaKODE}`,{
      headers:{Authorization:environment.apiKey}
    });
  }
}
