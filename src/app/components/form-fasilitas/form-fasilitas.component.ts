import { Fasilitas } from 'src/app/model/fasilitas.model';
import { FasilitasService } from './../../services/fasilitas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-fasilitas',
  templateUrl: './form-fasilitas.component.html',
  styleUrls: ['./form-fasilitas.component.scss']
})
export class FormFasilitasComponent implements OnInit {

  fasilitasForm:FormGroup;

  //for load edit
  loadData:boolean;

  //for load input
  loading:boolean;


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private fasilitasService:FasilitasService,
  private snackbar:MatSnackBar,
  private dialogRef:MatDialogRef<FormFasilitasComponent>) { }

  ngOnInit() {

    this.fasilitasForm = new FormGroup({
      fasilitasKODE:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]),
      fasilitasNAMA:new FormControl('',Validators.required),
      fasilitasGUNA:new FormControl('',Validators.required)
    });

    if(this.data.mode==='edit'){
      this.loadData = true;
      this.fasilitasService.getSingleFasilitas(this.data.id).subscribe((res:any)=>{
        this.loadData = false;
        const data:Fasilitas =res.data;
        this.fasilitasForm.setValue({
          fasilitasKODE:data.fasilitasKODE,
          fasilitasNAMA:data.fasilitasNAMA,
          fasilitasGUNA:data.fasilitasGUNA
        })
      },err=>{
        this.loadData = false;
        this.snackbar.open('Failed to get data, check your connection','Dismiss!');
      })
    }
  }

  onSubmit(){
    this.loading = true;
    const fasilitas:Fasilitas = {
      fasilitasGUNA:this.fasilitasForm.value.fasilitasGUNA,
      fasilitasKODE:this.fasilitasForm.value.fasilitasKODE,
      fasilitasNAMA:this.fasilitasForm.value.fasilitasNAMA
    }

    if(this.data.mode==='new'){
      //insert fasilitas
      this.fasilitasService.addFasilitas(fasilitas).subscribe((res:any)=>{
        this.loading = false;
        if(res.success && res.data){
          this.dialogRef.close();
          this.fasilitasService.getAllFasilitas();
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open('Failed to insert data','Dismiss!',{duration:3000});
        }
      },err=>{
        this.loading = false;
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
      })
    }else{
      //update fasilitas
      this.fasilitasService.updateFasilitas(fasilitas,this.data.id).subscribe((res:any)=>{
        this.loading = false;
        if(res.success && res.data){
          this.dialogRef.close();
          this.fasilitasService.getAllFasilitas();
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open('Failed to update data','Dismiss!',{duration:3000});
        }
      },err=>{
        this.loading = false;
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
      })
    }
  }

}
