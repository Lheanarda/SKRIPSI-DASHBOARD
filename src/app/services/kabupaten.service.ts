import { Kabupaten } from './../model/kabupaten.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class KabupatenService {

constructor(private httpClient:HttpClient, private snackbar:MatSnackBar) { }

loadKabupaten = new Subject<Kabupaten[]>();

getAllKabupaten(){
  this.httpClient.get(`${environment.endpoint}/kabupaten`,{
    headers:{
      Authorization:environment.apiKey
    }
  }).subscribe((response:any)=>{
    const success = response.success;
    const data:Kabupaten[] = response.data;
    if(success && data.length>0){
      this.loadKabupaten.next(data);
    }else{
      this.snackbar.open('Failed To Fetch Data','Dismiss!',{duration:3000})
    }
  },err=>[
    this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000})
  ])
}

getAllKabupatenForOptions(){
  return this.httpClient.get(`${environment.endpoint}/kabupaten`,{
    headers:{
      Authorization:environment.apiKey
    }
  })
}

getSingleKabupaten(kabupatenKODE:string){
  return this.httpClient.get(`${environment.endpoint}/kabupaten/${kabupatenKODE}`,{
    headers:{Authorization:environment.apiKey}
  });
}

addKabupaten(kabupaten:Kabupaten){
  return this.httpClient.post(`${environment.endpoint}/kabupaten`,{
    kabupatenKODE:kabupaten.kabupatenKODE,
    kabupatenNAMA:kabupaten.kabupatenNAMA,
    kabupatenALAMAT:kabupaten.kabupatenALAMAT,
    kabupatenKET:kabupaten.kabupatenKET,
    kabupatenFOTOICON:kabupaten.kabupatenFOTOICON,
    kabupatenFOTOICONKET:kabupaten.kabupatenFOTOICONKET
  },{
    headers:{
      Authorization:environment.apiKey
    }
  });
}

updateKabupaten(kabupaten:Kabupaten,kabupatenKODE:string){
  return this.httpClient.put(`${environment.endpoint}/kabupaten/${kabupatenKODE}`,{
    kabupatenKODE:kabupaten.kabupatenKODE,
    kabupatenNAMA:kabupaten.kabupatenNAMA,
    kabupatenALAMAT:kabupaten.kabupatenALAMAT,
    kabupatenKET:kabupaten.kabupatenKET,
    kabupatenFOTOICON:kabupaten.kabupatenFOTOICON,
    kabupatenFOTOICONKET:kabupaten.kabupatenFOTOICONKET
  },{
    headers:{Authorization:environment.apiKey}
  });
}

deleteKabupaten(kabupatenKODE:string){
  return this.httpClient.delete(`${environment.endpoint}/kabupaten/${kabupatenKODE}`,{
    headers:{Authorization:environment.apiKey}
  })
}
}
