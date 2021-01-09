import { Kecamatan } from './../model/kecamatan.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KecamatanService {

constructor(private httpClient:HttpClient, private snackbar:MatSnackBar) { }

loadKecamatan = new Subject<Kecamatan[]>();

getAllKecamatan(){
  this.httpClient.get(`${environment.endpoint}/kecamatan`,{
    headers:{
      Authorization:environment.apiKey
    }
  }).subscribe((response:any)=>{
    const success = response.success;
    const data:Kecamatan[] = response.data;
    if(success && data.length>0){
      this.loadKecamatan.next(data);
    }else{
      this.snackbar.open('Failed to fetch data','Dismiss!',{duration:3000});
    }
  },err=>{
    this.snackbar.open('Check your network and try again','Dismiss!')
  })
}

getAllKecamatanForOptions(){
  return this.httpClient.get(`${environment.endpoint}/kecamatan`,{
    headers:{
      Authorization:environment.apiKey
    }
  })
}

getSingleKecamatan(kecamatanKODE:string){
  return this.httpClient.get(`${environment.endpoint}/kecamatan/${kecamatanKODE}`,{
    headers:{Authorization:environment.apiKey}
  });
}

addKecamatan(kecamatan:Kecamatan){
  return this.httpClient.post(`${environment.endpoint}/kecamatan`,{
    kecamatanKODE:kecamatan.kecamatanKODE,
    kecamatanNAMA:kecamatan.kecamatanNAMA,
    kecamatanALAMAT:kecamatan.kecamatanALAMAT,
    kecamatanKET:kecamatan.kecamatanKET,
    kabupatenKODE:kecamatan.kabupatenKODE
  },{
    headers:{
      Authorization:environment.apiKey
    }
  })
}

updateKecamatan(kecamatan:Kecamatan,kecamatanKODE:string){
  return this.httpClient.put(`${environment.endpoint}/kecamatan/${kecamatanKODE}`,{
    kecamatanKODE:kecamatan.kecamatanKODE,
    kecamatanNAMA:kecamatan.kecamatanNAMA,
    kecamatanALAMAT:kecamatan.kecamatanALAMAT,
    kecamatanKET:kecamatan.kecamatanKET,
    kabupatenKODE:kecamatan.kabupatenKODE
  },{headers:{
    Authorization:environment.apiKey
  }})
}

deleteKecamatan(kecamatanKODE:string){
  return this.httpClient.delete(`${environment.endpoint}/kecamatan/${kecamatanKODE}`,{
    headers:{Authorization:environment.apiKey}
  },);
}

}
