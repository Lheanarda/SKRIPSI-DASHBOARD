
import { HttpClient } from '@angular/common/http';

export default class UploadAdapter{
  //init variable
  loader;
  uploadIndicator:any;
  http:HttpClient;
  endpoint:string;
  apiKey:string;
  beritaFotos:string[];

  constructor(loader,uploadIndicator,http,endpoint,apiKey,beritaFotos){
    this.loader = loader;
    this.uploadIndicator = uploadIndicator;
    this.http = http;
    this.endpoint = endpoint;
    this.apiKey =apiKey;
    this.beritaFotos = beritaFotos;
  }

  upload(){
    return new Promise((resolve,reject)=>{
      this.uploadIndicator.next('uploading');

      this.loader.file.then(file=>{
        //upload to server
        const fd = new FormData();
        fd.append('image',file,'berita_'+ Date.now()+'_'+file.name);
        this.http.post(`${this.endpoint}/image`,fd,{
          headers:{
            Authorization:this.apiKey
          }
        }).subscribe((res:any)=>{
          console.log(res);
          this.uploadIndicator.next('success');
          this.beritaFotos.push(res.messages[0]);
          resolve({default:`${this.endpoint}/images/${res.messages[0]}`})
        },err=>{
          this.uploadIndicator.next('failed');
        })
      },err=>{
        console.log(err);
        this.uploadIndicator.next('failed');
      })
    })
  }

  abort(){
    console.log('Upload Abort!');
    this.uploadIndicator.next('failed');
  }
}
