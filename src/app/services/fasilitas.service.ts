import { environment } from './../../environments/environment';
import { FasilitasObyek } from './../model/fasilitas-obyek.model';
import { Injectable } from '@angular/core';
import { Fasilitas } from '../model/fasilitas.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FasilitasService {

fasilitass:Fasilitas[]=[
  {
    fasilitasKODE:'FS01',
    fasilitasNAMA:'Tempat Parkir',
    fasilitasGUNA:'Sebagai sarana tempat untuk memarkirkan kendaraan para pengunjung'
  },
  {
    fasilitasKODE:'FS02',
    fasilitasNAMA:'Restaurant (Rumah Makan)',
    fasilitasGUNA:'Sebagai sarana yang disediakan obyek wisata untuk menyediakan sarana makan siang maupun malam '
  }
]

fasilitasObyeks:FasilitasObyek[]=[
  {
    fasilitasKODE:'FS01',
    obyekKODE:'W01',
    fasilitasNAMA:'Tempat Parkir',
    fasilitasobyekKET:'Tempat Parkir Wisata Candi Borobudur',
    obyekNAMA:'Candi Borobudur'
  }
]

  constructor(private http:HttpClient,private snackbar:MatSnackBar) { }

  loadFasilitas = new Subject<Fasilitas[]>();

  getAllFasilitas(){
    this.http.get(`${environment.endpoint}/fasilitas`,{
      headers:{
        Authorization:environment.apiKey
      }
    }).subscribe((res:any)=>{
      if(res.success && res.data){
        this.loadFasilitas.next(res.data);
      }else{
        this.snackbar.open(`Failed to fetch data`,'Dismiss!',{duration:3000});
      }
    },err=>{
      this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
    })
  }

  getAllFasilitasForOpitons(){
    return this.http.get(`${environment.endpoint}/fasilitas`,{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  getSingleFasilitas(fasilitasKODE:string){
    return this.http.get(`${environment.endpoint}/fasilitas/${fasilitasKODE}`,{
      headers:{
        Authorization:environment.apiKey
      }
    });
  }

  addFasilitas(fasilitas:Fasilitas){
    return this.http.post(`${environment.endpoint}/fasilitas`,{
      fasilitasKODE:fasilitas.fasilitasKODE,
      fasilitasNAMA:fasilitas.fasilitasNAMA,
      fasilitasGUNA:fasilitas.fasilitasGUNA
    },{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  updateFasilitas(fasilitas:Fasilitas,fasilitasKODE:string){
    return this.http.put(`${environment.endpoint}/fasilitas/${fasilitasKODE}`,{
      fasilitasKODE:fasilitas.fasilitasKODE,
      fasilitasNAMA:fasilitas.fasilitasNAMA,
      fasilitasGUNA:fasilitas.fasilitasGUNA
    },{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  deleteFasilitas(fasilitasKODE:string){
    return this.http.delete(`${environment.endpoint}/fasilitas/${fasilitasKODE}`,{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }
}
