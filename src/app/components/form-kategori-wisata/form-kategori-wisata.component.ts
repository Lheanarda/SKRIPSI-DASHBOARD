import { KategoriwisataService } from './../../services/kategoriwisata.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KategoriWisata } from 'src/app/model/kategori-wisata.model';

@Component({
  selector: 'app-form-kategori-wisata',
  templateUrl: './form-kategori-wisata.component.html',
  styleUrls: ['./form-kategori-wisata.component.scss']
})
export class FormKategoriWisataComponent implements OnInit {

  kategoriWisataForm:FormGroup;
  //for load edit
  loadData:boolean;
  //for load input;
  loading:boolean;


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private katService:KategoriwisataService,
  private snackbar:MatSnackBar,
  private dialogRef:MatDialogRef<FormKategoriWisataComponent>) { }

  ngOnInit() {
    this.kategoriWisataForm = new FormGroup({
      kategoriKODE:new FormControl(null,[Validators.required,Validators.maxLength(4),Validators.minLength(4)]),
      kategoriNAMA:new FormControl(null,Validators.required),
      kategoriKET:new FormControl(null,Validators.required),
      kategoriREFERENCE:new FormControl('')
    });

    if(this.data.mode === 'edit'){
      this.loadData = true;
      this.katService.getSingleKategoriWisata(this.data.id).subscribe((res:any)=>{
        this.loadData = false;
        const data:KategoriWisata = res.data;
        this.kategoriWisataForm.setValue({
          kategoriKODE:data.kategoriKODE,
          kategoriNAMA:data.kategoriNAMA,
          kategoriKET:data.kategoriKET,
          kategoriREFERENCE:data.kategoriREFERENCE
        })
      },err=>{
        this.loadData = false;
        this.snackbar.open('Failed to get data, check your connection','Dismiss!');
      })
    }
  }

  onSubmit(){
    this.loading = true;
    const kategoriWisata:KategoriWisata={
      kategoriKODE:this.kategoriWisataForm.value.kategoriKODE,
      kategoriKET:this.kategoriWisataForm.value.kategoriKET,
      kategoriNAMA:this.kategoriWisataForm.value.kategoriNAMA,
      kategoriREFERENCE:this.kategoriWisataForm.value.kategoriREFERENCE
    }

    if(this.data.mode === 'new'){
      //insert kategori wisata
      this.katService.addKategoriWisata(kategoriWisata).subscribe((res:any)=>{
        this.loading = false;
        if(res.success && res.data){
          this.dialogRef.close();
          this.katService.getAllKategoriWisata();
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open('Failed to insert data','Dismiss!',{duration:3000});
        }
      },err=>{
        console.log(err);
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000})
      })
    }else{
      //update kategori wisata
      this.katService.updateKategoriWisata(kategoriWisata,this.data.id).subscribe((res:any)=>{
        this.loading = false;
        if(res.success && res.data){
          this.dialogRef.close();
          this.katService.getAllKategoriWisata();
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open('Failed to update data','Dismiss!');
        }
      },err=>{
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000})
      })
    }
  }


}
