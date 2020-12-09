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

kategoris:KategoriWisata[]=[
  {
    kategoriKODE:'KW01',
    kategoriNAMA:'Cultural Heritage (Warisan Budaya)',
    kategoriKET:'Peninggalan atau warisan (heritage) merupakan konsep yang luas mencakup warisan yang bersifat alamiah, asli dan merupakan sejarah atau budaya kita.',
    kategoriREFERENCE:'ICOMOS, 2002'
  },
  {
    kategoriKODE:'KW02',
    kategoriKET:'Jenis wisata budaya yang sedang populer, karena  banyak orang yang semakin mengembangkan spiritualitas mereka sendiri dan untuk menemukan hal yang lainnya. ',
    kategoriNAMA:'Spiritual Tourism (Wisata Rohani)',
    kategoriREFERENCE:'https://www.igi-global.com/dictionary/spiritual-tourism/39292'
    }
  ]

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
}
