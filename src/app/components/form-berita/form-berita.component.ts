import { fadeIn } from './../../shared/animations';
import { Subscription } from 'rxjs';
import { environment } from './../../../environments/environment';
import { KategoriberitaService } from './../../services/kategoriberita.service';
import { KategoriBerita } from './../../model/kategori-berita.model';
import { KegiatanService } from './../../services/kegiatan.service';
import { KabupatenService } from './../../services/kabupaten.service';
import { Kegiatan } from './../../model/kegiatan.model';
import { Kabupaten } from './../../model/kabupaten.model';
import { Berita } from './../../model/berita.model';
import { ImageService } from './../../services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BeritaService } from './../../services/berita.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit, OnDestroy, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as DecoupledEditor from '@omretterry/ckeditor5-build-decoupled-document-imageresize';
import UploadAdapter from 'src/app/shared/UploadAdapter';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-form-berita',
  templateUrl: './form-berita.component.html',
  styleUrls: ['./form-berita.component.scss'],
  animations:[fadeIn]
})
export class FormBeritaComponent implements OnInit,OnDestroy {

  //CK EDITOR
  Editor = DecoupledEditor;
  config = {
    removePlugins:['insertMedia'],
    placeholder:'Detail Request...',
  }

  beritaForm:FormGroup;
  //for load edit
  loadData:boolean;
  //for load input
  loading:boolean;
  isUpload:string;

  //image ctrl
  currentImageFile:any;
  firstImage:string;

  //options
  kabupatens:Kabupaten[];
  kegiatans:Kegiatan[];
  kategoris:KategoriBerita[];

  //subs
  uploadSubs:Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private beritaService:BeritaService,
  private dialogRef:MatDialogRef<FormBeritaComponent>,
  private kabService:KabupatenService,
  private katBeritaService:KategoriberitaService,
  private kegiatanService:KegiatanService,
  private snackbar:MatSnackBar,
  private http:HttpClient,
  private zone:NgZone,
  private imgService:ImageService,
  private imageService:ImageService) { }

  ngOnInit() {
    this.loadOptions();

    this.uploadSubs = this.beritaService.uploadIndicator.subscribe((data:any)=>{
      this.zone.run(()=>{
        this.isUpload = data;
        setTimeout(()=>{
          this.isUpload = null;
        },2000)
      })
    })
    this.beritaForm = new FormGroup({
      beritaKODE:new FormControl(null,Validators.required),
      beritaJUDUL:new FormControl(null,Validators.required),
      beritaISI:new FormControl(null,Validators.required),
      beritaGAMBAR:new FormControl(null,Validators.required),
      beritaTGL:new FormControl(null,Validators.required),
      beritaSUMBER:new FormControl(null,Validators.required),
      kategoriberitaKODE:new FormControl(null,Validators.required),
      eventKODE:new FormControl(null),
      kabupatenKODE:new FormControl(null)
    });

    if(this.data.mode==='edit'){
      this.loadData = true;
      this.beritaService.getSingleBerita(this.data.id).subscribe((res:any)=>{
        this.loadData= false;
        const data:Berita = res.data;
        this.beritaForm.setValue({
          beritaKODE:data.beritaKODE,
          beritaJUDUL:data.beritaJUDUL,
          beritaISI:data.beritaISI,
          beritaGAMBAR:data.beritaGAMBAR,
          beritaTGL:data.beritaTGL,
          beritaSUMBER:data.beritaSUMBER,
          kategoriberitaKODE:data.kategoriberitaKODE,
          eventKODE:data.eventKODE,
          kabupatenKODE:data.kabupatenKODE
        });
        this.firstImage = data.beritaGAMBAR;
      })
    }
  }

  loadOptions(){
    this.loadData = true;
    this.kabService.getAllKabupatenForOptions().subscribe((res:any)=>{
      this.loadData =false;
      if(res.success && res.data){
        this.kabupatens = res.data
      }
    },err=>{
      this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
    })

    this.kegiatanService.getAllKegiatanForOptions().subscribe((res:any)=>{
      this.loadData = false;
      if(res.success && res.data){
        this.kegiatans = res.data
      }
    },err=>{
      this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
    });

    this.katBeritaService.getAllKategoriBeritaForOptions().subscribe((res:any)=>{
      this.loadData = false;
      if(res.success && res.data){
        this.kategoris = res.data
      }
    },err=>{
      this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
    })
  }

  onReadFile(event){
    this.currentImageFile = event.target.files[0];
    this.beritaForm.patchValue({beritaGAMBAR:Date.now()+'_'+this.currentImageFile.name})
  }

  onEditorReady(editor){
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );

    editor.plugins.get('FileRepository').createUploadAdapter = (loader)=>{
      //uplaod adapter
      return new UploadAdapter(loader,this.beritaService.uploadIndicator,this.http, environment.endpoint,environment.apiKey);
    }
  }
  onEditorChange({editor}:ChangeEvent){
    if(editor){
      this.beritaForm.patchValue({beritaISI:editor.getData()});
    }
  }

  onAction(berita){
    //action
    if(this.data.mode==='new'){
      //add berita
      this.beritaService.addBerita(berita).subscribe((res:any)=>{
        this.loading= false;
        if(res.success && res.data){
          this.dialogRef.close();
          this.beritaService.getAllBerita();
          this.snackbar.open('Berita has been added','Dismiss!',{duration:3000});
        }
      },err=>{
        this.loading = false;
        this.snackbar.open(err.error.messages[0],'Dismiss!',{duration:3000});
      })
    }else{
      //update
      this.beritaService.updateBerita(berita,this.data.id).subscribe((res:any)=>{
        this.loading = false;
        if(res.success && res.data){
          this.dialogRef.close();
          this.beritaService.getAllBerita();
          this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000})
        }else{
          this.snackbar.open(`${res.messages[0]}`,'Dismiss!',{duration:3000});
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
    const berita:Berita={
      beritaKODE:this.beritaForm.value.beritaKODE,
      beritaGAMBAR:this.beritaForm.value.beritaGAMBAR,
      beritaISI:this.beritaForm.value.beritaISI,
      beritaJUDUL:this.beritaForm.value.beritaJUDUL,
      beritaSUMBER:this.beritaForm.value.beritaSUMBER,
      beritaTGL:this.beritaForm.value.beritaTGL,
      eventKODE:this.beritaForm.value.eventKODE,
      kabupatenKODE:this.beritaForm.value.kabupatenKODE,
      kategoriberitaKODE:this.beritaForm.value.kategoriberitaKODE
    }
    if(this.currentImageFile){
      //upload image
      this.imageService.onSaveImage(this.currentImageFile,berita.beritaGAMBAR).subscribe((res:any)=>{
        this.onAction(berita);
        this.imageService.onDeleteImage(this.firstImage);
      })
    }else{
      this.onAction(berita);
    }
  }

  ngOnDestroy(){
    if(this.uploadSubs){
      this.uploadSubs.unsubscribe();
    }
  }

}
