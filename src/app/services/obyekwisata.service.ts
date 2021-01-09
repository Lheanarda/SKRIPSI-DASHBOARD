import { environment } from './../../environments/environment';
import { ObyekWisata } from './../model/obyek-wisata.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObyekwisataService {


  constructor(private http:HttpClient,private snackbar:MatSnackBar) { }

  loadObyekWisata = new Subject<ObyekWisata[]>();

  getAllObyekWisata(){
    this.http.get(`${environment.endpoint}/obyek`,{
      headers:{
        Authorization:environment.apiKey
      }
    }).subscribe((res:any)=>{
      const data:ObyekWisata[] = res.data;
      if(res.success && data.length>0){
        this.loadObyekWisata.next(data);
      }else{
        this.snackbar.open('Failed to fetch data','Dismiss',{duration:3000});
      }
    },err=>{
      this.snackbar.open('Check your network and try again','Dismiss!')
    })
  }

  getAllObyekWisataForOptions(){
    return this.http.get(`${environment.endpoint}/obyek`,{
      headers:{
        Authorization:environment.apiKey
      }
    });
  }

  getSingleObyekWisata(obyekKODE:string){
    return this.http.get(`${environment.endpoint}/obyek/${obyekKODE}`,{
      headers:{Authorization:environment.apiKey}
    })
  }

  addObyekWisata(obyek:ObyekWisata){
    return this.http.post(`${environment.endpoint}/obyek`,{
      obyekKODE:obyek.obyekKODE,
      obyekNAMA:obyek.obyekNAMA,
      kecamatanKODE:obyek.kecamatanKODE,
      kategoriKODE:obyek.kategoriKODE,
      obyekALAMAT:obyek.obyekALAMAT,
      obyekDERAJAT_S:obyek.obyekDERAJAT_S,
      obyekMENIT_S:obyek.obyekMENIT_S,
      obyekDETIK_S:obyek.obyekDETIK_S,
      obyekLATITUDE:obyek.obyekLATITUDE,
      obyekDERAJAT_E:obyek.obyekDERAJAT_E,
      obyekMENIT_E:obyek.obyekMENIT_E,
      obyekDETIK_E:obyek.obyekDETIK_E,
      obyekLONGITUDE:obyek.obyekLONGITUDE,
      obyekKETINGGIAN:obyek.obyekKETINGGIAN,
      obyekJAMBUKA:obyek.obyekJAMBUKA,
      obyekJAMTUTUP:obyek.obyekJAMTUTUP,
      obyekWAKTUKUNJUNG:obyek.obyekWAKTUKUNJUNG,
      obyekPOPULARITAS:obyek.obyekPOPULARITAS,
      obyekKEMUDAHAN:obyek.obyekKEMUDAHAN,
      obyekDEFINISI:obyek.obyekDEFINISI,
      obyekKETERANGAN:obyek.obyekKETERANGAN,
      obyekFOTO:obyek.obyekFOTO
    },{
      headers:{
        Authorization:environment.apiKey
      }
    })
  }

  updateObyekWisata(obyek:ObyekWisata,obyekKODE:string){
    return this.http.put(`${environment.endpoint}/obyek/${obyekKODE}`,{
      obyekKODE:obyek.obyekKODE,
      obyekNAMA:obyek.obyekNAMA,
      kecamatanKODE:obyek.kecamatanKODE,
      kategoriKODE:obyek.kategoriKODE,
      obyekALAMAT:obyek.obyekALAMAT,
      obyekDERAJAT_S:obyek.obyekDERAJAT_S,
      obyekMENIT_S:obyek.obyekMENIT_S,
      obyekDETIK_S:obyek.obyekDETIK_S,
      obyekLATITUDE:obyek.obyekLATITUDE,
      obyekDERAJAT_E:obyek.obyekDERAJAT_E,
      obyekMENIT_E:obyek.obyekMENIT_E,
      obyekDETIK_E:obyek.obyekDETIK_E,
      obyekLONGITUDE:obyek.obyekLONGITUDE,
      obyekKETINGGIAN:obyek.obyekKETINGGIAN,
      obyekJAMBUKA:obyek.obyekJAMBUKA,
      obyekJAMTUTUP:obyek.obyekJAMTUTUP,
      obyekWAKTUKUNJUNG:obyek.obyekWAKTUKUNJUNG,
      obyekPOPULARITAS:obyek.obyekPOPULARITAS,
      obyekKEMUDAHAN:obyek.obyekKEMUDAHAN,
      obyekDEFINISI:obyek.obyekDEFINISI,
      obyekKETERANGAN:obyek.obyekKETERANGAN,
      obyekFOTO:obyek.obyekFOTO
    },{
      headers:{Authorization:environment.apiKey}
    })
  }

  deleteObyekWisata(obyekKODE:string){
    return this.http.delete(`${environment.endpoint}/obyek/${obyekKODE}`,{
      headers:{Authorization:environment.apiKey}
    })
  }
}
