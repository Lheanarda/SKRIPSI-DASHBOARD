import { KategoriBerita } from './../../model/kategori-berita.model';

import { KategoriberitaService } from './../../services/kategoriberita.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-kategori-berita',
  templateUrl: './form-kategori-berita.component.html',
  styleUrls: ['./form-kategori-berita.component.scss']
})
export class FormKategoriBeritaComponent implements OnInit {

  kategoriBeritaForm:FormGroup;

  //for load edit
  loadData:boolean;

  //for load input
  loading:boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private katBeritaService:KategoriberitaService,
  private snackbar:MatSnackBar,
  private dialogRef:MatDialogRef<FormKategoriBeritaComponent>) { }

  ngOnInit() {
    this.kategoriBeritaForm = new FormGroup({
      kategoriberitaKODE:new FormControl(null,Validators.required),
      kategoriberitaNAMA:new FormControl(null,Validators.required),
      kategoriberitaKET:new FormControl(null)
    });

    if(this.data.mode==='edit'){
      this.loadData = true;
      this.katBeritaService.getSingleKategoriBerita(this.data.id).subscribe((res:any)=>{
        this.loadData = false;
        const data:KategoriBerita = res.data;
        this.kategoriBeritaForm.setValue({
          kategoriberitaKODE:data.kategoriberitaKODE,
          kategoriberitaNAMA:data.kategoriberitaNAMA,
          kategoriberitaKET:data.kategoriberitaKET
        })
      },err=>{
        this.loadData = false;;
        this.snackbar.open('Failed to get data, check your connection','Dismiss!');
      })
    }
  }

  onSubmit(){
    this.loading = true;

    const kategoriBerita:KategoriBerita={
      kategoriberitaKODE:this.kategoriBeritaForm.value.kategoriberitaKODE,
      kategoriberitaKET:this.kategoriBeritaForm.value.kategoriberitaKET,
      kategoriberitaNAMA:this.kategoriBeritaForm.value.kategoriberitaNAMA
    }

    if(this.data.mode==='new'){
      //insert kategori berita
      this.katBeritaService.addKategoriBerita(kategoriBerita).subscribe((res:any)=>{
        this.loading = false;
        if(res.success && res.data){
          this.dialogRef.close();
          this.katBeritaService.getAllKategoriBerita();
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open('Failed to insert data','Dismiss!',{duration:3000});
        }
      },err=>{
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
      })
    }else{
      //update kategori berita
      this.katBeritaService.updateKategoriBerita(kategoriBerita,this.data.id).subscribe((res:any)=>{
        console.log(res);
        this.loading = false;
        if(res.success && res.data){
          this.dialogRef.close();
          this.katBeritaService.getAllKategoriBerita();
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open('Failed to update data','Dismiss!',{duration:3000});
        }
      },err=>{
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000})
      })
    }
  }

}
