import { FasilitasObyek } from './../../model/fasilitas-obyek.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObyekwisataService } from './../../services/obyekwisata.service';
import { FasilitasService } from './../../services/fasilitas.service';
import { FasilitasObyekService } from './../../services/fasilitas-obyek.service';
import { ObyekWisata } from './../../model/obyek-wisata.model';
import { Fasilitas } from './../../model/fasilitas.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-fasilitas-obyek',
  templateUrl: './form-fasilitas-obyek.component.html',
  styleUrls: ['./form-fasilitas-obyek.component.scss']
})
export class FormFasilitasObyekComponent implements OnInit {

  fasilObyekForm:FormGroup;

  //for load edit
  loadData:boolean;
  //for load input
  loading:boolean;

  //options
  fasilitass:Fasilitas[];
  obyeks:ObyekWisata[];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private fasilObyekService:FasilitasObyekService,
  private fasilService:FasilitasService,
  private obyekService:ObyekwisataService,
  private snackbar:MatSnackBar,
  private dialogRef:MatDialogRef<FormFasilitasObyekComponent>) { }

  ngOnInit() {
    this.loadOptions();
    this.fasilObyekForm = new FormGroup({
      fasilitasKODE:new FormControl(null,Validators.required),
      obyekKODE:new FormControl(null,Validators.required),
      fasilitasobyekKET:new FormControl(null)
    });

    if(this.data.mode==='edit'){
      this.loadData = true;
      this.fasilObyekService.getSingleFasilitasObyek(this.data.fasilitasKODE,this.data.obyekKODE).subscribe((res:any)=>{
        this.loadData = false;
        const data:FasilitasObyek = res.data;
        this.fasilObyekForm.setValue({
          fasilitasKODE:data.fasilitasKODE,
          obyekKODE:data.obyekKODE,
          fasilitasobyekKET:data.fasilitasobyekKET
        })
      },err=>{
        console.log(err);
        this.loadData = false;
        this.snackbar.open('Failed to get data, check your connection','Dismiss!');
      })
    }

  }

  loadOptions(){
    this.loadData = true;
    this.obyekService.getAllObyekWisataForOptions().subscribe((res:any)=>{
      this.loadData = false;
      if(res.success && res.data){
        this.obyeks = res.data
      }
    },err=>{
      this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
    });

    this.fasilService.getAllFasilitasForOpitons().subscribe((res:any)=>{
      this.loadData = false;
      if(res.success && res.data){
        this.fasilitass = res.data
      }
    })
  }

  onSubmit(){
    this.loading = true;
    const fasilObyek:FasilitasObyek={
      fasilitasKODE:this.fasilObyekForm.value.fasilitasKODE,
      fasilitasobyekKET:this.fasilObyekForm.value.fasilitasobyekKET,
      obyekKODE:this.fasilObyekForm.value.obyekKODE,
      fasilitasNAMA:null,
      obyekNAMA:null
    }

    if(this.data.mode==='new'){
      //insert
      this.fasilObyekService.addFasilitasObyek(fasilObyek).subscribe((res:any)=>{
        this.loading = false;
        if(res.success && res.data){
          this.dialogRef.close();
          this.fasilObyekService.getAllFasilitasObyek();
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open('Failed to insert data','Dismiss!',{duration:3000});
        }
      },err=>{
        console.log(err);
        this.loading = false;
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000})
      })
    }else{
      //update
      this.fasilObyekService.updateFasilitasObyek(fasilObyek,this.data.fasilitasKODE,this.data.obyekKODE).subscribe((res:any)=>{
        this.loading = false;
        if(res.success){
          this.dialogRef.close();
          this.fasilObyekService.getAllFasilitasObyek();
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
