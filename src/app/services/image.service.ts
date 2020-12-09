import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  onSaveImage(file:File,name:string){
    const fd = new FormData();
    fd.append('image',file,name);
    return this.http.post(`${environment.endpoint}/image`,fd,{
      headers:{
        Authorization:environment.apiKey
      }
    });
  }
}
