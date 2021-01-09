import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LaporanService {

  constructor(private http:HttpClient, private snackbar:MatSnackBar) { }

  onFetchLaporan(){
    return this.http.get(`${environment.endpoint}/laporan`,{
      headers:{
        Authorization:environment.apiKey
      }
    });
  }
}
