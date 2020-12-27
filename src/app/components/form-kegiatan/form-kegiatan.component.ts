import { Kegiatan } from './../../model/kegiatan.model';
import { ImageService } from './../../services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KegiatanService } from './../../services/kegiatan.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-kegiatan',
  templateUrl: './form-kegiatan.component.html',
  styleUrls: ['./form-kegiatan.component.scss']
})
export class FormKegiatanComponent implements OnInit {

  kegiatanForm:FormGroup;
  //for load edit
  loadData:boolean;
  //for load input
  loading:boolean;

  //image ctrl
  currentImageFile:any;
  firstImage:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private kegiatanService:KegiatanService,
  private dialogRef:MatDialogRef<FormKegiatanComponent>,
  private snackbar:MatSnackBar,
  private imageService:ImageService) { }

  ngOnInit() {
    this.kegiatanForm = new FormGroup({
      eventKODE:new FormControl(null,[Validators.required,Validators.maxLength(4),Validators.minLength(4)]),
      eventNAMA:new FormControl(null,Validators.required),
      eventKET:new FormControl(null,Validators.required),
      eventPOSTER:new FormControl(null,Validators.required),
      eventMULAI:new FormControl(null,Validators.required),
      eventSELESAI:new FormControl(null,Validators.required)
    });

    if(this.data.mode==='edit'){
      this.loadData = true;
      this.kegiatanService.getSingleKegiatan(this.data.id).subscribe((res:any)=>{
        this.loadData = false;
        const data:Kegiatan = res.data;
        this.kegiatanForm.setValue({
          eventKODE:data.eventKODE,
          eventNAMA:data.eventNAMA,
          eventKET:data.eventKET,
          eventPOSTER:data.eventPOSTER,
          eventMULAI:data.eventMULAI,
          eventSELESAI:data.eventSELESAI
        });
        this.firstImage = data.eventPOSTER
      })
    }
  }
  onReadFile(event){
    this.currentImageFile = event.target.files[0];
    this.kegiatanForm.patchValue({eventPOSTER:Date.now()+'_'+this.currentImageFile.name})
  }

  onAction(kegiatan){
    //action
    if(this.data.mode==='new'){
      //add kegiatan
      this.kegiatanService.addKegiatan(kegiatan).subscribe((res:any)=>{
        this.loading = false;
        if(res.success){
          this.dialogRef.close();
          this.kegiatanService.getAllKegiatan();
          this.snackbar.open('Kegiatan has been added','Dismiss!',{duration:3000});
        }
      },err=>{
        this.loading =false;
        this.snackbar.open(err.error.messages[0],'Dismiss',{duration:3000});

      })
    }else{
      //update kegiatan
      this.kegiatanService.updateKegiatan(kegiatan,this.data.id).subscribe((res:any)=>{
        this.loading = false;
        if(res.success && res.data){
          this.dialogRef.close();
          this.kegiatanService.getAllKegiatan();
          this.snackbar.open(`${res.messages[0]}`,'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
        }
      },err=>{
        this.loading = false;
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
      })
    }
  }

  onSubmit(){
    this.loading =true;
    const kegiatan:Kegiatan={
      eventKET:this.kegiatanForm.value.eventKET,
      eventKODE:this.kegiatanForm.value.eventKODE,
      eventMULAI:this.kegiatanForm.value.eventMULAI,
      eventNAMA:this.kegiatanForm.value.eventNAMA,
      eventPOSTER:this.kegiatanForm.value.eventPOSTER,
      eventSELESAI:this.kegiatanForm.value.eventSELESAI
    }

    if(this.currentImageFile){
      //upload image
      this.imageService.onSaveImage(this.currentImageFile,kegiatan.eventPOSTER).subscribe((res:any)=>{
        this.onAction(kegiatan);
        this.imageService.onDeleteImage(this.firstImage);
      },err=>{
        this.loading = false;
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
      })
    }else{
      this.onAction(kegiatan);
    }
  }

}
