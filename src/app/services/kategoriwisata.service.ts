import { environment } from './../../environments/environment';
import { KategoriWisata } from './../model/kategori-wisata.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KategoriwisataService {

  constructor(private httpClient:HttpClient, private snackbar:MatSnackBar) { }
  loadKategoriWisata = new Subject<KategoriWisata[]>();

  getAllKategoriWisata(){
    this.httpClient.get(`${environment.endpoint}/kategoriwisata`,{
      headers:{Authorization:environment.apiKey}
    }).subscribe((response:any)=>{
      const success = response.success;
      const data:KategoriWisata[] = response.data;
      if(success && data.length>0){
        this.loadKategoriWisata.next(data);
      }else{
        this.snackbar.open('Failed to Fetch data','Dismiss!',{duration:3000});
      }
    },err=>{
      this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
    })
  }

  getAllKategoriWisataForOptions(){
    return this.httpClient.get(`${environment.endpoint}/kategoriwisata`,{
      headers:{Authorization:environment.apiKey}
    })
  }

  getSingleKategoriWisata(kategoriKODE:string){
    return this.httpClient.get(`${environment.endpoint}/kategoriwisata/${kategoriKODE}`,{
      headers:{Authorization:environment.apiKey}
    })
  }

  addKategoriWisata(kategoriwisata:KategoriWisata){
    return this.httpClient.post(`${environment.endpoint}/kategoriwisata`,{
      kategoriKODE:kategoriwisata.kategoriKODE,
      kategoriNAMA:kategoriwisata.kategoriNAMA,
      kategoriKET:kategoriwisata.kategoriKET,
      kategoriREFERENCE:kategoriwisata.kategoriREFERENCE
    },{
      headers:{Authorization:environment.apiKey}
    });
  }

  updateKategoriWisata(kategoriwisata:KategoriWisata,kategoriKODE:string){
    return this.httpClient.put(`${environment.endpoint}/kategoriwisata/${kategoriKODE}`,{
      kategoriKODE:kategoriwisata.kategoriKODE,
      kategoriNAMA:kategoriwisata.kategoriNAMA,
      kategoriKET:kategoriwisata.kategoriKET,
      kategoriREFERENCE:kategoriwisata.kategoriREFERENCE
    },{
      headers:{Authorization:environment.apiKey}
    });
  }

  deleteKategoriWisata(kategoriKODE:string){
    return this.httpClient.delete(`${environment.endpoint}/kategoriwisata/${kategoriKODE}`,{
      headers:{Authorization:environment.apiKey}
    });
  }
}
