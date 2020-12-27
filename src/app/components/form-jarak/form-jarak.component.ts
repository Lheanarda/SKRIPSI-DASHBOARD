import { Jarak } from './../../model/jarak.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObyekwisataService } from './../../services/obyekwisata.service';
import { JarakService } from './../../services/jarak.service';
import { ObyekWisata } from './../../model/obyek-wisata.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-jarak',
  templateUrl: './form-jarak.component.html',
  styleUrls: ['./form-jarak.component.scss']
})
export class FormJarakComponent implements OnInit {


  jarakForm:FormGroup;

  //for load edit
  loadData:boolean;

  //for load input
  loading:boolean;

  //jarak options
  obyekWisata:ObyekWisata[];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private jarakService:JarakService,
  private obyekWisService:ObyekwisataService,
  private snackbar:MatSnackBar,
  private dialogRef:MatDialogRef<FormJarakComponent>) { }

  ngOnInit() {
    this.loadOptions();
    this.jarakForm = new FormGroup({
      obyekKODEasal:new FormControl(null,Validators.required),
      obyekKODEtujuan:new FormControl(null,Validators.required),
      obyekjarak:new FormControl(null,Validators.required),
      obyektempuh:new FormControl(null,Validators.required),
      obyekRUTE:new FormControl(null)
    });

    if(this.data.mode==='edit'){
      this.loadData = true;
      this.jarakService.getSingleJarakObyek(this.data.kodeASAL,this.data.kodeTUJUAN).subscribe((res:any)=>{
        this.loadData = false;
        const data:Jarak = res.data;
        this.jarakForm.setValue({
          obyekKODEasal:data.obyekKODEasal,
          obyekKODEtujuan:data.obyekKODEtujuan,
          obyekjarak:data.obyekjarak,
          obyektempuh:data.obyektempuh,
          obyekRUTE:data.obyekRUTE
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
    this.obyekWisService.getAllObyekWisataForOptions().subscribe((res:any)=>{
      this.loadData = false;
      if(res.success && res.data){
        this.obyekWisata = res.data;
      }
    },err=>{
      this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
    })
  }

  onSubmit(){
    this.loading = true;

    const jarak:Jarak={
      obyekKODEasal:this.jarakForm.value.obyekKODEasal,
      obyekKODEtujuan:this.jarakForm.value.obyekKODEtujuan,
      obyekRUTE:this.jarakForm.value.obyekRUTE,
      obyekjarak:this.jarakForm.value.obyekjarak,
      obyektempuh:this.jarakForm.value.obyektempuh
    };

    if(this.data.mode==='new'){
      //insert jarak
      this.jarakService.addJarakObyek(jarak).subscribe((res:any)=>{
        this.loading = false;
        if(res.success && res.data){
          this.dialogRef.close();
          this.jarakService.getAllJarakObyek();
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open('Failed to insert data','Dismiss!',{duration:3000});
        }
      },err=>{
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000})
      })
    }else{
      //update jarak
      this.jarakService.updateJarakObyek(jarak,this.data.kodeASAL,this.data.kodeTUJUAN).subscribe((res:any)=>{
        this.loading = false;
        if(res.success){
          this.dialogRef.close();
          this.jarakService.getAllJarakObyek();
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open('Failed to update data','Dismiss!',{duration:3000});
        }
      },err=>{
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
      })
    }
  }

}
