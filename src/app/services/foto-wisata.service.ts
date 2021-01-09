import { environment } from './../../environments/environment';
import { FotoWisata } from './../model/fotowisata.model';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FotoWisataService {

  constructor(private http:HttpClient,private snackbar:MatSnackBar) { }

  loadFotoWisata = new Subject<FotoWisata[]>();

  getAllFotoWisata(){
    this.http.get(`${environment.endpoint}/fotowisata`,{
      headers:{
        Authorization:environment.apiKey
      }
    }).subscribe((res:any)=>{
      if(res.success){
        this.loadFotoWisata.next(res.data);
      }else{
        this.snackbar.open('Failed To Fetch Data','Dismiss!',{duration:3000})
      }
    },err=>{
      this.snackbar.open('Check your network and try again','Dismiss!')
    });
  }

  getSingleFotoWisata(fotoobyekKODE:string){
    return this.http.get(`${environment.endpoint}/fotowisata/${fotoobyekKODE}`,{
      headers:{Authorization:environment.apiKey}
    });
  }

  addFotoWisata(fotoWisata:FotoWisata){
    console.log(fotoWisata);
    return this.http.post(`${environment.endpoint}/fotowisata`,{
      fotoobyekKODE:fotoWisata.fotoobyekKODE,
      fotoobyekNAMA:fotoWisata.fotoobyekNAMA,
      fotoobyekKET:fotoWisata.fotoobyekKET,
      fotoobyekTGLAMBIL:fotoWisata.fotoobyekTGLAMBIL,
      fotoobyekGAMBAR:fotoWisata.fotoobyekGAMBAR,
      obyekKODE:fotoWisata.obyekKODE
    },{
      headers:{Authorization:environment.apiKey}
    })
  }

  updateFotoWisata(fotoWisata:FotoWisata,fotoobyekKODE:string){
    return this.http.put(`${environment.endpoint}/fotowisata/${fotoobyekKODE}`,{
      fotoobyekKODE:fotoWisata.fotoobyekKODE,
      fotoobyekNAMA:fotoWisata.fotoobyekNAMA,
      fotoobyekKET:fotoWisata.fotoobyekKET,
      fotoobyekTGLAMBIL:fotoWisata.fotoobyekTGLAMBIL,
      fotoobyekGAMBAR:fotoWisata.fotoobyekGAMBAR,
      obyekKODE:fotoWisata.obyekKODE
    },{
      headers:{Authorization:environment.apiKey}
    })
  }

  deleteFotoWisata(fotoobyekKODE:string){
    return this.http.delete(`${environment.endpoint}/fotowisata/${fotoobyekKODE}`,{
      headers:{Authorization:environment.apiKey}
    })
  }



}
