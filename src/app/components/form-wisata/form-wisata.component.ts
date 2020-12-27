import { KategoriwisataService } from './../../services/kategoriwisata.service';
import { Kecamatan } from './../../model/kecamatan.model';
import { ImageService } from './../../services/image.service';
import { ObyekwisataService } from './../../services/obyekwisata.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObyekWisata } from 'src/app/model/obyek-wisata.model';
import { KategoriWisata } from 'src/app/model/kategori-wisata.model';
import { KecamatanService } from 'src/app/services/kecamatan.service';

@Component({
  selector: 'app-form-wisata',
  templateUrl: './form-wisata.component.html',
  styleUrls: ['./form-wisata.component.scss']
})
export class FormWisataComponent implements OnInit {

  obyekForm:FormGroup;
  //for load edit
  loadData:boolean;
  //for load input
  loading:boolean;

  //img ctrl
  currentImageFile:any;
  firstImage:string;

  //options
  kecamatans:Kecamatan[];
  katWisatas:KategoriWisata[];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private obyekService:ObyekwisataService,
  private dialogRef:MatDialogRef<FormWisataComponent>,
  private snackbar:MatSnackBar,
  private imgService:ImageService,
  private kecService:KecamatanService,
  private katService:KategoriwisataService
  ) { }

  ngOnInit() {

    this.onLoadOptions();

    this.obyekForm = new FormGroup({
      obyekKODE:new FormControl(null,Validators.required),
      obyekNAMA:new FormControl(null,Validators.required),
      kecamatanKODE:new FormControl(null,Validators.required),
      kategoriKODE:new FormControl(null,Validators.required),
      obyekALAMAT:new FormControl(null,Validators.required),
      obyekDERAJAT_S:new FormControl(''),
      obyekMENIT_S:new FormControl(''),
      obyekDETIK_S:new FormControl(''),
      obyekLATITUDE:new FormControl('',Validators.required),
      obyekDERAJAT_E:new FormControl(''),
      obyekMENIT_E:new FormControl(''),
      obyekDETIK_E:new FormControl(''),
      obyekLONGITUDE:new FormControl('',Validators.required),
      obyekKETINGGIAN:new FormControl(''),
      obyekJAMBUKA:new FormControl(new Date(),Validators.required),
      obyekJAMTUTUP:new FormControl(new Date(),Validators.required),
      obyekWAKTUKUNJUNG:new FormControl('',Validators.required),
      obyekPOPULARITAS:new FormControl('',Validators.required),
      obyekKEMUDAHAN:new FormControl('',Validators.required),
      obyekDEFINISI:new FormControl(''),
      obyekKETERANGAN:new FormControl(''),
      obyekFOTO:new FormControl('',Validators.required)
    });

    if(this.data.mode==='edit'){
      this.loadData = true;
      this.obyekService.getSingleObyekWisata(this.data.id).subscribe((res:any)=>{
        this.loadData = false;
        const data:ObyekWisata = res.data;
        const timeBuka = (new Date()+" ").split(" ");
        const timeTutup = (new Date()+" ").split(" ");

        timeBuka[4] = data.obyekJAMBUKA;
        timeTutup[4] = data.obyekJAMTUTUP;

        this.obyekForm.setValue({
          obyekKODE:data.obyekKODE,
          obyekNAMA:data.obyekNAMA,
          kecamatanKODE:data.kecamatanKODE,
          kategoriKODE:data.kategoriKODE,
          obyekALAMAT:data.obyekALAMAT,
          obyekDERAJAT_S:data.obyekDERAJAT_S,
          obyekMENIT_S:data.obyekMENIT_S,
          obyekDETIK_S:data.obyekDETIK_S,
          obyekLATITUDE:data.obyekLATITUDE,
          obyekDERAJAT_E:data.obyekDERAJAT_E,
          obyekMENIT_E:data.obyekMENIT_E,
          obyekDETIK_E:data.obyekDETIK_E,
          obyekLONGITUDE:data.obyekLONGITUDE,
          obyekKETINGGIAN:data.obyekKETINGGIAN,
          obyekJAMBUKA:new Date(timeBuka.join(" ")),
          obyekJAMTUTUP:new Date(timeTutup.join(" ")),
          obyekWAKTUKUNJUNG:data.obyekWAKTUKUNJUNG,
          obyekPOPULARITAS:data.obyekPOPULARITAS,
          obyekKEMUDAHAN:data.obyekKEMUDAHAN,
          obyekDEFINISI:data.obyekDEFINISI,
          obyekKETERANGAN:data.obyekKETERANGAN,
          obyekFOTO:data.obyekFOTO
        });

        this.firstImage = data.obyekFOTO;
      })
    }
  }

  onLoadOptions(){
    this.loadData = true;
    this.kecService.getAllKecamatanForOptions().subscribe((res:any)=>{
      this.loadData = false;
      if(res.success){
        this.kecamatans = res.data;
      }
    },err=>{
      this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
    });

    this.katService.getAllKategoriWisataForOptions().subscribe((res:any)=>{
      this.loadData = false;
      if(res.success){
        this.katWisatas = res.data;
      }
    },err=>{
      this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
    })
  }

  onReadFile(event){
    this.currentImageFile = event.target.files[0];
    this.obyekForm.patchValue({obyekFOTO:Date.now()+'_'+this.currentImageFile.name});
  }

  onAction(obyek){
    if(this.data.mode==='new'){
      //insert wisata
      this.obyekService.addObyekWisata(obyek).subscribe((res:any)=>{
        this.loading = false;
        if(res.success){
          this.dialogRef.close();
          this.obyekService.getAllObyekWisata();
          this.snackbar.open(`Obyek Wisata has been added`,'Dismiss!',{duration:3000})
        }
      },err=>{
        this.loading = false;
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000})
      })
    }else{
      //update wisata
      this.obyekService.updateObyekWisata(obyek,this.data.id).subscribe((res:any)=>{
        this.loading = false;
        if(res.success && res.data){
          this.dialogRef.close();
          this.obyekService.getAllObyekWisata();
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
        }else{
          this.snackbar.open(`${res.messages[0]}`,'Dismiss!',{duration:3000});
        }
      },err=>{
        this.loading = false;
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
      })
    }
  }

  onSubmit(){
    this.loading = true;
    const obyekWisata:ObyekWisata={
      obyekKODE:this.obyekForm.value.obyekKODE,
      obyekNAMA:this.obyekForm.value.obyekNAMA,
      kecamatanKODE:this.obyekForm.value.kecamatanKODE,
      kategoriKODE:this.obyekForm.value.kategoriKODE,
      obyekALAMAT:this.obyekForm.value.obyekALAMAT,
      obyekDERAJAT_S:this.obyekForm.value.obyekDERAJAT_S,
      obyekMENIT_S:this.obyekForm.value.obyekMENIT_S,
      obyekDETIK_S:this.obyekForm.value.obyekDETIK_S,
      obyekLATITUDE:this.obyekForm.value.obyekLATITUDE,
      obyekDERAJAT_E:this.obyekForm.value.obyekDERAJAT_E,
      obyekMENIT_E:this.obyekForm.value.obyekMENIT_E,
      obyekDETIK_E:this.obyekForm.value.obyekDETIK_E,
      obyekLONGITUDE:this.obyekForm.value.obyekLONGITUDE,
      obyekKETINGGIAN:this.obyekForm.value.obyekKETINGGIAN,
      obyekJAMBUKA:this.obyekForm.value.obyekJAMBUKA.toString().split(" ")[4],
      obyekJAMTUTUP:this.obyekForm.value.obyekJAMTUTUP.toString().split(" ")[4],
      obyekWAKTUKUNJUNG:this.obyekForm.value.obyekWAKTUKUNJUNG,
      obyekPOPULARITAS:this.obyekForm.value.obyekPOPULARITAS,
      obyekKEMUDAHAN:this.obyekForm.value.obyekKEMUDAHAN,
      obyekDEFINISI:this.obyekForm.value.obyekDEFINISI,
      obyekKETERANGAN:this.obyekForm.value.obyekKETERANGAN,
      obyekFOTO:this.obyekForm.value.obyekFOTO
    }

    if(this.currentImageFile){
      //upload image
      this.imgService.onSaveImage(this.currentImageFile,obyekWisata.obyekFOTO).subscribe((res:any)=>{
        this.onAction(obyekWisata);
        if(this.data.mode==='edit'){
          this.imgService.onDeleteImage(this.firstImage);
        }
      },err=>{
        this.loading = false;
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});

      })
    }else{
      this.onAction(obyekWisata);
    }
  }

}
