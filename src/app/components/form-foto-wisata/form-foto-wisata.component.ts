import { ImageService } from './../../services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FotoWisataService } from './../../services/foto-wisata.service';
import { ObyekwisataService } from './../../services/obyekwisata.service';
import { ObyekWisata } from './../../model/obyek-wisata.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FotoWisata } from 'src/app/model/fotowisata.model';

@Component({
  selector: 'app-form-foto-wisata',
  templateUrl: './form-foto-wisata.component.html',
  styleUrls: ['./form-foto-wisata.component.scss']
})
export class FormFotoWisataComponent implements OnInit {

  fotoWisataForm:FormGroup;

  //for load edit
  loadData:boolean;
  //for load input
  loading:boolean;

  //img ctrl
  currentImageFile:any;
  firstImage:string;

  //options
  obyeks:ObyekWisata[];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private obyekService:ObyekwisataService,
  private fotoWisataService:FotoWisataService,
  private dialogRef:MatDialogRef<FormFotoWisataComponent>,
  private snackbar:MatSnackBar,
  private imageService:ImageService) { }

  ngOnInit() {
    this.onLoadOptions();
    this.fotoWisataForm = new FormGroup({
      fotoobyekKODE:new FormControl(null,Validators.required),
      fotoobyekNAMA:new FormControl(null,Validators.required),
      fotoobyekKET:new FormControl(null),
      fotoobyekTGLAMBIL:new FormControl(new Date(),Validators.required),
      fotoobyekGAMBAR:new FormControl(null,Validators.required),
      obyekKODE:new FormControl(null,Validators.required)
    });

    if(this.data.mode==='edit'){
      this.loadData = true;
      this.fotoWisataService.getSingleFotoWisata(this.data.id).subscribe((res:any)=>{
        this.loadData = false;
        const data:FotoWisata = res.data;
        this.fotoWisataForm.setValue({
          fotoobyekKODE:data.fotoobyekKODE,
          fotoobyekNAMA:data.fotoobyekNAMA,
          fotoobyekKET:data.fotoobyekKET,
          fotoobyekTGLAMBIL:data.fotoobyekTGLAMBIL,
          fotoobyekGAMBAR:data.fotoobyekGAMBAR,
          obyekKODE:data.obyekKODE
        });
        this.firstImage = data.fotoobyekGAMBAR;
      })
    }
  }

  onLoadOptions(){
    this.loadData = true;
    this.obyekService.getAllObyekWisataForOptions().subscribe((res:any)=>{
      this.loadData = false;
      if(res.success){
        this.obyeks = res.data
      }
    },err=>{
      this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
    })
  }

  onReadFile(event){
    this.currentImageFile = event.target.files[0];
    this.fotoWisataForm.patchValue({fotoobyekGAMBAR:Date.now()+'_'+this.currentImageFile.name});
  }

  onAction(fotoWisata){
    if(this.data.mode==='new'){
      //insert
      this.fotoWisataService.addFotoWisata(fotoWisata).subscribe((res:any)=>{
        this.loading = false;
        if(res.success){
          this.dialogRef.close();
          this.fotoWisataService.getAllFotoWisata();
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
        }
      },err=>{
        this.loading = false;
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000})
      })
    }else{
      //update
      this.fotoWisataService.updateFotoWisata(fotoWisata,this.data.id).subscribe((res:any)=>{
        this.loading = false;
        if(res.success && res.data){
          this.dialogRef.close();
          this.fotoWisataService.getAllFotoWisata();
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
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
    this.loading = true;
    const fotoWisata:FotoWisata={
      fotoobyekGAMBAR:this.fotoWisataForm.value.fotoobyekGAMBAR,
      fotoobyekKET:this.fotoWisataForm.value.fotoobyekKET,
      fotoobyekKODE:this.fotoWisataForm.value.fotoobyekKODE,
      fotoobyekNAMA:this.fotoWisataForm.value.fotoobyekNAMA,
      fotoobyekTGLAMBIL:this.fotoWisataForm.value.fotoobyekTGLAMBIL,
      obyekKODE:this.fotoWisataForm.value.obyekKODE
    }

    if(this.currentImageFile){
      //upload image
      this.imageService.onSaveImage(this.currentImageFile,fotoWisata.fotoobyekGAMBAR).subscribe((res:any)=>{
        this.onAction(fotoWisata);
        if(this.data.mode==='edit'){
          console.log('delete image')
          this.imageService.onDeleteImage(this.firstImage);
        }
      },err=>{
        this.loading = false;
        this.snackbar.open('Something went wrong, try again!','Dismiss!',{duration:3000});
      })
    }else{
      this.onAction(fotoWisata);
    }
  }

}
