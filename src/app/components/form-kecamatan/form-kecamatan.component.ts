import { Kecamatan } from './../../model/kecamatan.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KabupatenService } from './../../services/kabupaten.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KecamatanService } from 'src/app/services/kecamatan.service';
import { Kabupaten } from 'src/app/model/kabupaten.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-kecamatan',
  templateUrl: './form-kecamatan.component.html',
  styleUrls: ['./form-kecamatan.component.scss']
})
export class FormKecamatanComponent implements OnInit {

  kecamatanForm:FormGroup;

  //for load edit
  loadData:Boolean;

  //for load input
  loading:Boolean;

  //kabupaten options
  kabupatens:Kabupaten[];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private kecService:KecamatanService,
  private kabService:KabupatenService,
  private snackbar:MatSnackBar,
  private dialogRef:MatDialogRef<FormKecamatanComponent>) { }

  ngOnInit() {

    this.loadKabupaten();
    this.kecamatanForm = new FormGroup({
      'kecamatanKODE':new FormControl(null,Validators.required),
      'kecamatanNAMA':new FormControl(null,Validators.required),
      'kecamatanALAMAT':new FormControl(null,Validators.required),
      'kecamatanKET':new FormControl(null),
      'kabupatenKODE':new FormControl(null,Validators.required)
    })

    if(this.data.mode==='edit'){
      this.loadData = true;
      this.kecService.getSingleKecamatan(this.data.id).subscribe((response:any)=>{
        this.loadData = false;
        const data:Kecamatan = response.data;
        this.kecamatanForm.setValue({
          kecamatanKODE:data.kecamatanKODE,
          kecamatanNAMA:data.kecamatanNAMA,
          kecamatanALAMAT:data.kecamatanALAMAT,
          kecamatanKET:data.kecamatanKET,
          kabupatenKODE:data.kabupatenKODE
        })
      })
    }
  }

  loadKabupaten(){
    this.loadData = true;
    this.kabService.getAllKabupatenForOptions().subscribe((response:any)=>{
      this.loadData = false;
      const success = response.success;
      if(success){
        this.kabupatens= response.data;
      }
    },err=>{
      this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
    })
  }

  onSubmit(){
    this.loading = true;

    const kecamatan:Kecamatan={
      kecamatanKODE:this.kecamatanForm.value.kecamatanKODE,
      kecamatanNAMA:this.kecamatanForm.value.kecamatanNAMA,
      kecamatanALAMAT:this.kecamatanForm.value.kecamatanALAMAT,
      kecamatanKET:this.kecamatanForm.value.kecamatanKET,
      kabupatenKODE:this.kecamatanForm.value.kabupatenKODE
    }

    if(this.data.mode==='new'){
      //insert kecamatan
      this.kecService.addKecamatan(kecamatan).subscribe((response:any)=>{
        this.loading = false;
        const success = response.success;
        if(success){
          this.dialogRef.close();
          this.kecService.getAllKecamatan();
          this.snackbar.open(response.messages[0],'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open('Failed to insert data','Dismiss!',{duration:3000});
        }
      },err=>{
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
      })
    }else{
      //update kecamatan
      this.kecService.updateKecamatan(kecamatan,this.data.id).subscribe((response:any)=>{
        this.loading = false;
        const success =response.success;
        if(success){
          this.dialogRef.close();
          this.kecService.getAllKecamatan();
          this.snackbar.open(response.messages[0],'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open('Failed to update data','Dismiss!',{duration:3000});
        }
      },err=>{
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
      });
    }
  }
}
