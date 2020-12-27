
import { HttpClient } from '@angular/common/http';

export default class UploadAdapter{
  //init variable
  loader;
  uploadIndicator:any;
  http:HttpClient;
  endpoint:string;
  apiKey:string;

  constructor(loader,uploadIndicator,http,endpoint,apiKey){
    this.loader = loader;
    this.uploadIndicator = uploadIndicator;
    this.http = http;
    this.endpoint = endpoint;
    this.apiKey =apiKey
  }

  upload(){
    return new Promise((resolve,reject)=>{
      this.uploadIndicator.next('uploading');

      this.loader.file.then(file=>{
        //upload to server
        const fd = new FormData();
        fd.append('image',file,file.name);
        this.http.post(`${this.endpoint}/image`,fd,{
          headers:{
            Authorization:this.apiKey
          }
        }).subscribe((res:any)=>{
          console.log(res);
          this.uploadIndicator.next('success');
          resolve({default:`${this.endpoint}/images/${res.messages[0]}`})
          // resolve({default:'http://localhost/v1/images/Blue%20Tree.jpg'})
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
