import { ImageService } from './../../services/image.service';
import { Kabupaten } from 'src/app/model/kabupaten.model';
import { KabupatenService } from './../../services/kabupaten.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-kabupaten',
  templateUrl: './form-kabupaten.component.html',
  styleUrls: ['./form-kabupaten.component.scss']
})
export class FormKabupatenComponent implements OnInit {

  kabupatenForm:FormGroup;
  //for load edit
  loadData:Boolean;
  //for load input
  loading:Boolean;

  //image ctrl
  currentImageFile:any;
  firstImage:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private kabService:KabupatenService,
  private dialogRef:MatDialogRef<FormKabupatenComponent>,
  private snackbar:MatSnackBar,
  private imgService:ImageService,
  private imageService:ImageService) {}

  ngOnInit() {
    this.kabupatenForm = new FormGroup({
      'kabupatenKODE':new FormControl(null,Validators.required),
      'kabupatenNAMA':new FormControl(null,Validators.required),
      'kabupatenALAMAT':new FormControl(null,Validators.required),
      'kabupatenKET':new FormControl(null),
      'kabupatenFOTOICON':new FormControl(null,Validators.required),
      'kabupatenFOTOICONKET':new FormControl(null)
    });

    if(this.data.mode==='edit'){
      this.loadData = true;
      this.kabService.getSingleKabupaten(this.data.id).subscribe((response:any)=>{
        this.loadData = false;
        const data:Kabupaten = response.data;
        this.kabupatenForm.setValue({
          kabupatenKODE:data.kabupatenKODE,
          kabupatenNAMA:data.kabupatenNAMA,
          kabupatenALAMAT:data.kabupatenALAMAT,
          kabupatenKET:data.kabupatenKET,
          kabupatenFOTOICON:data.kabupatenFOTOICON,
          kabupatenFOTOICONKET:data.kabupatenFOTOICONKET
        });
        this.firstImage = data.kabupatenFOTOICON;
      })
    }
  }
  onReadFile(event){
    this.currentImageFile = event.target.files[0];
    this.kabupatenForm.patchValue({kabupatenFOTOICON:Date.now()+'_'+this.currentImageFile.name})
  }

  onAction(kabupaten){
    //action
    if(this.data.mode === 'new'){
      //add kabupaten
      this.kabService.addKabupaten(kabupaten).subscribe((response:any)=>{
        const success = response.success;
        this.loading = false;
        if(success){
          this.dialogRef.close();
          this.kabService.getAllKabupaten();
          this.snackbar.open('Kabupaten has been added','Dismiss!',{duration:3000})
        }
      },(err:any)=>{
        console.log(err);
        this.loading = false;
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
      })
    }else{
      //update kabupaten
      this.kabService.updateKabupaten(kabupaten,this.data.id).subscribe((response:any)=>{
        console.log(response);
        this.loading = false;
        const success = response.success;
        if(success && response.data){
          this.dialogRef.close();
          this.kabService.getAllKabupaten();
          this.snackbar.open(`${response.messages[0]}`,'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open(`${response.messages[0]}`,'Dismiss!',{duration:3000});
        }
      },err=>{
        console.log(err);
        this.loading = false;
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
      })
    }
  }

  onSubmit(){
    this.loading = true;
    const kabupaten:Kabupaten={
      kabupatenKODE:this.kabupatenForm.value.kabupatenKODE,
      kabupatenNAMA:this.kabupatenForm.value.kabupatenNAMA,
      kabupatenALAMAT:this.kabupatenForm.value.kabupatenALAMAT,
      kabupatenFOTOICON:this.kabupatenForm.value.kabupatenFOTOICON,
      kabupatenFOTOICONKET:this.kabupatenForm.value.kabupatenFOTOICONKET,
      kabupatenKET:this.kabupatenForm.value.kabupatenKET
    }
    //kalau ada gambar yang ditampung
    if(this.currentImageFile){
      //upload image
      this.imageService.onSaveImage(this.currentImageFile,kabupaten.kabupatenFOTOICON).subscribe((res:any)=>{
        this.onAction(kabupaten);
        if(this.data.mode==='edit'){
          console.log('delete image')
          this.imgService.onDeleteImage(this.firstImage);
        }
      },err=>{
        this.loading = false;
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
      })
    }else{
      this.onAction(kabupaten);
    }
  }

}
