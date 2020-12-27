import { ImageService } from './../../services/image.service';
import { FotoWisataService } from './../../services/foto-wisata.service';
import { FasilitasObyekService } from './../../services/fasilitas-obyek.service';
import { JarakService } from './../../services/jarak.service';
import { BeritaService } from './../../services/berita.service';
import { KegiatanService } from './../../services/kegiatan.service';
import { KategoriberitaService } from './../../services/kategoriberita.service';
import { FasilitasService } from './../../services/fasilitas.service';
import { ObyekwisataService } from './../../services/obyekwisata.service';
import { KategoriwisataService } from './../../services/kategoriwisata.service';
import { environment } from './../../../environments/environment';
import { KecamatanService } from 'src/app/services/kecamatan.service';
import { Subscription } from 'rxjs';
import { KabupatenService } from './../../services/kabupaten.service';
import { FormFotoWisataComponent } from './../form-foto-wisata/form-foto-wisata.component';
import { FormFasilitasObyekComponent } from './../form-fasilitas-obyek/form-fasilitas-obyek.component';
import { FormJarakComponent } from './../form-jarak/form-jarak.component';
import { FormBeritaComponent } from './../form-berita/form-berita.component';
import { FormWisataComponent } from './../form-wisata/form-wisata.component';
import { FormKecamatanComponent } from './../form-kecamatan/form-kecamatan.component';
import { FormFasilitasComponent } from './../form-fasilitas/form-fasilitas.component';
import { FormKategoriBeritaComponent } from './../form-kategori-berita/form-kategori-berita.component';
import { FormKegiatanComponent } from './../form-kegiatan/form-kegiatan.component';
import { DialogDeleteComponent } from './../dialog-delete/dialog-delete.component';
import { FormKabupatenComponent } from './../form-kabupaten/form-kabupaten.component';
import { flyIn } from './../../shared/animations';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormKategoriWisataComponent } from '../form-kategori-wisata/form-kategori-wisata.component';
import { Kabupaten } from 'src/app/model/kabupaten.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Kecamatan } from 'src/app/model/kecamatan.model';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
  animations:[flyIn]
})
export class ListTableComponent implements OnInit, OnDestroy {

  //viewchild
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort:MatSort;

  //Input
  @Input()title:string;
  @Input()displayedColumns:String[];
  @Input()headerColumns:String[];
  @Input()listSource:any[];

  //basic var
  dataSource;
  imgUrl:string =`${environment.endpoint}/images`

  //loading
  deleteLoading:Boolean = false;

  //Selecttion
  selection = new SelectionModel(true,[]);

  //subs
  kabupatenSubs:Subscription;
  kecamatanSubs:Subscription;
  katWisataSubs:Subscription;
  katBeritaSubs:Subscription;
  obyekSubs:Subscription;
  fasilitasSubs:Subscription;
  kegiatanSubs:Subscription;
  beritaSubs:Subscription;
  jarakSubs:Subscription;
  fasilObyekSubs:Subscription;
  fotoObyekSubs:Subscription;

  constructor(
    public dialog:MatDialog ,
    private kabService:KabupatenService,
    private kecService:KecamatanService,
    private katWisataService:KategoriwisataService,
    private obyekService:ObyekwisataService,
    private fasilitasService:FasilitasService,
    private katBeritaService:KategoriberitaService,
    private kegiatanService:KegiatanService,
    private beritaService:BeritaService,
    private jarakService:JarakService,
    private fotoObyekService:FotoWisataService,
    private fasilObyekService:FasilitasObyekService,
    private imageService:ImageService,
    private snackbar:MatSnackBar) { }

  ngOnInit() {
    //init data on load
    this.initiateDataSource(this.listSource);

    //kabupaten subs
    this.kabupatenSubs =  this.kabService.loadKabupaten.subscribe((data:Kabupaten[])=>{
      this.initiateDataSource(data);
    })

    //kecamatan subs
    this.kecamatanSubs = this.kecService.loadKecamatan.subscribe((data:Kecamatan[])=>{
      this.initiateDataSource(data);
    });

    //kategori wisata subs
    this.katWisataSubs = this.katWisataService.loadKategoriWisata.subscribe((data:any)=>{
      this.initiateDataSource(data);
    });

    //obyek wisata subs
    this.obyekSubs = this.obyekService.loadObyekWisata.subscribe((data:any)=>{
      this.initiateDataSource(data);
    })


    //fasil subs
    this.fasilitasSubs = this.fasilitasService.loadFasilitas.subscribe((data:any)=>{
      this.initiateDataSource(data);
    });

    //kategori berita
    this.katBeritaSubs = this.katBeritaService.loadKategoriBerita.subscribe((data:any)=>{
      this.initiateDataSource(data);
    });

    //kegiatan
    this.kegiatanSubs = this.kegiatanService.loadKegiatan.subscribe((data:any)=>{
      this.initiateDataSource(data);
    });

    //berita
    this.beritaSubs = this.beritaService.loadBerita.subscribe((data:any)=>{
      this.initiateDataSource(data);
    });

    //jarak
    this.jarakSubs = this.jarakService.loadJarak.subscribe((data:any)=>{
      this.initiateDataSource(data);
    });

    //fasil obyek
    this.fasilObyekSubs = this.fasilObyekService.loadFasilitasObyek.subscribe((data:any)=>{
      this.initiateDataSource(data);
    });

    //foto wisata
    this.fotoObyekSubs = this.fotoObyekService.loadFotoWisata.subscribe((data:any)=>{
      this.initiateDataSource(data);
    })
  }

  //init data function
  initiateDataSource(dataSource){
    if(this.listSource){
      this.dataSource = new MatTableDataSource(dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  //filter displayed columns
  filterDisplayedColumns(){
    const contentColumns = this.displayedColumns.filter(column=>column!='update'&&column!='delete' && column!='select');
    return contentColumns;
  }

  //Filter
  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  //DIALOG
  onManipulate(mode:'new'|'edit', el?:any){
    let dialogRef;
    if(!el){
      el = {};
    }
    switch (this.title.toLowerCase()){
      case 'kabupaten':
        dialogRef = this.dialog.open(FormKabupatenComponent,{data:{title:this.title,mode:mode, id:el.kabupatenKODE},disableClose:true});
        break;
      case 'kegiatan':
        dialogRef = this.dialog.open(FormKegiatanComponent,{data:{title:this.title,mode:mode,id:el.eventKODE},disableClose:true});
        break;
      case 'kategori berita':
        dialogRef = this.dialog.open(FormKategoriBeritaComponent,{data:{title:this.title,mode:mode,id:el.kategoriberitaKODE},disableClose:true});
        break;
      case 'kategori wisata':
        dialogRef = this.dialog.open(FormKategoriWisataComponent,{data:{title:this.title,mode:mode,id:el.kategoriKODE},disableClose:true});
        break;
      case 'fasilitas':
        dialogRef = this.dialog.open(FormFasilitasComponent,{data:{title:this.title,mode:mode,id:el.fasilitasKODE},disableClose:true});
        break;
      case 'kecamatan':
        dialogRef = this.dialog.open(FormKecamatanComponent,{data:{title:this.title,mode:mode,id:el.kecamatanKODE},disableClose:true});
        break;
      case 'obyek wisata':
        dialogRef = this.dialog.open(FormWisataComponent,{data:{title:this.title,mode:mode,id:el.obyekKODE},disableClose:true});
        break;
      case 'berita':
        dialogRef = this.dialog.open(FormBeritaComponent,{data:{title:this.title,mode:mode,id:el.beritaKODE},disableClose:true});
        break;
      case 'jarak antar wisata':
        dialogRef = this.dialog.open(FormJarakComponent,{data:{title:this.title,mode:mode,kodeASAL:el.obyekKODEasal,kodeTUJUAN:el.obyekKODEtujuan},disableClose:true});
        break;
      case 'fasilitas obyek wisata':
        dialogRef = this.dialog.open(FormFasilitasObyekComponent,{data:{title:this.title,mode:mode,fasilitasKODE:el.fasilitasKODE,obyekKODE:el.obyekKODE},disableClose:true});
        break;
      case 'foto obyek wisata':
        dialogRef = this.dialog.open(FormFotoWisataComponent,{data:{title:this.title,mode:mode,id:el.fotoobyekKODE},disableClose:true});
        break;
    }
  }
  openDialogDelete(mode:'one'|'bulk', el:any){

    let dialogRef = this.dialog.open(DialogDeleteComponent,{data:{title:this.title, mode:mode}});
    dialogRef.afterClosed().subscribe(result=>{
      if(result==='true'){
        switch (this.title.toLowerCase()){
          case 'kabupaten':
            this.deleteLoading = true;
            this.kabService.deleteKabupaten(el.kabupatenKODE).subscribe((response:any)=>{
              this.deleteLoading = false;
              this.snackbar.open(response.messages[0],'Dismiss!',{duration:3000})
              this.kabService.getAllKabupaten();
              this.imageService.onDeleteImage(el.kabupatenFOTOICON);
            },err=>{
              this.deleteLoading = false;
              this.snackbar.open('constraint violation!','Dismiss!')
            });
            break;
          case 'kategori berita':
            this.deleteLoading = true;
            this.katBeritaService.deleteKategoriBerita(el.kategoriberitaKODE).subscribe((res:any)=>{
              this.deleteLoading = false;
              this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
              this.katBeritaService.getAllKategoriBerita();
            },err=>{
              this.deleteLoading = false;
              this.snackbar.open('constraint violation','Dismiss!')
            })
            break;
          case 'kategori wisata':
            this.deleteLoading = true;
            this.katWisataService.deleteKategoriWisata(el.kategoriKODE).subscribe((res:any)=>{
              this.deleteLoading=false;
              this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
              this.katWisataService.getAllKategoriWisata();
            },err=>{
              this.deleteLoading = false;
              this.snackbar.open('constraint violation!','Dismiss!')
            })
            break;
          case 'kecamatan':
            this.deleteLoading = true;
            this.kecService.deleteKecamatan(el.kecamatanKODE).subscribe((response:any)=>{
              console.log(response);
              this.deleteLoading = false;
              this.snackbar.open(response.messages[0],'Dismiss!',{duration:3000});
              this.kecService.getAllKecamatan();
            },err=>{
              this.deleteLoading = false;
              this.snackbar.open('constraint violation!','Dismiss!')
            });
            break;
          case 'obyek wisata':
            this.deleteLoading = true;
            this.obyekService.deleteObyekWisata(el.obyekKODE).subscribe((res:any)=>{
              this.deleteLoading = false;
              this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
              this.obyekService.getAllObyekWisata();
              this.imageService.onDeleteImage(el.obyekFOTO);
            },err=>{
              this.deleteLoading = false;
              this.snackbar.open('constraint violation!','Dismiss!')
            })
            break;
          case 'fasilitas':
            this.deleteLoading = true;
            this.fasilitasService.deleteFasilitas(el.fasilitasKODE).subscribe((res:any)=>{
              this.deleteLoading = false;
              this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
              this.fasilitasService.getAllFasilitas();
            },err=>{
              this.deleteLoading = false;
              this.snackbar.open('constraint violation!','Dismiss!');
            })
            break;
          case 'kegiatan':
            this.deleteLoading = true;
            this.kegiatanService.deleteKegiatan(el.eventKODE).subscribe((res:any)=>{
              this.deleteLoading = false;
              this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
              this.kegiatanService.getAllKegiatan();
              this.imageService.onDeleteImage(el.eventPOSTER);
            },err=>{
              this.deleteLoading = false;
              this.snackbar.open('constraint violation!','Dismiss!');
            })
            break;
          case 'berita':
            this.deleteLoading = true;
            this.beritaService.deleteBerita(el.beritaKODE).subscribe((res:any)=>{
              this.deleteLoading = false;
              this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
              this.beritaService.getAllBerita();
              this.imageService.onDeleteImage(el.beritaGAMBAR);
            },err=>{
              this.deleteLoading = false;
              this.snackbar.open('constraint violation!','Dismiss!');
            })
            break;
          case 'jarak antar wisata':
            this.deleteLoading = true;
            this.jarakService.deleteJarakObyek(el.obyekKODEasal,el.obyekKODEtujuan).subscribe((res:any)=>{
              this.deleteLoading = false;
              this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
              this.jarakService.getAllJarakObyek();
            },err=>{
              this.deleteLoading = false;
              this.snackbar.open('constraint violation!','Dismiss!');
            })
            break;
          case 'fasilitas obyek wisata':
            this.deleteLoading = true;
            this.fasilObyekService.deleteFasilitasObyek(el.fasilitasKODE,el.obyekKODE).subscribe((res:any)=>{
              this.deleteLoading  = false;
              this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
              this.fasilObyekService.getAllFasilitasObyek();
            },err=>{
              this.deleteLoading = false;
              this.snackbar.open('Constraint violation','Dismiss!');
            });
            break;
          case 'foto obyek wisata':
            this.deleteLoading=true;
            this.fotoObyekService.deleteFotoWisata(el.fotoobyekKODE).subscribe((res:any)=>{
              this.deleteLoading = false;
              this.snackbar.open(res.messages[0],'Dismiss!',{duration:3000});
              this.fotoObyekService.getAllFotoWisata();
              this.imageService.onDeleteImage(el.fotoobyekGAMBAR);
            },err=>{
              this.deleteLoading = false;
              this.snackbar.open('Constraint violation','Dismiss!');
            })
            break;
        }
      }
    })
  }

  //SELECTION

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  //Read To be deleted Ids
  readSelectedIds(){
    let ids = [];
    this.selection.selected.forEach(selected=>{
      ids.push(selected.id);
    })
    console.log(ids) //TO DELETE DATA
    return ids;
  }


  helperConditionListTable(displayedColumn:string, value:string){
    if(displayedColumn===value) return true;
    else return false;
  }

  ngOnDestroy(){
    if(this.kabupatenSubs){
      this.kabupatenSubs.unsubscribe();
    }

    if(this.kecamatanSubs){
      this.kecamatanSubs.unsubscribe();
    }
    if(this.katWisataSubs){
      this.katWisataSubs.unsubscribe();
    }
    if(this.obyekSubs){
      this.obyekSubs.unsubscribe();
    }
    if(this.beritaSubs){
      this.beritaSubs.unsubscribe();
    }
    if(this.katBeritaSubs){
      this.katBeritaSubs.unsubscribe();
    }
    if(this.fasilitasSubs){
      this.fasilitasSubs.unsubscribe();
    }
    if(this.kegiatanSubs){
      this.kegiatanSubs.unsubscribe();
    }
    if(this.jarakSubs){
      this.jarakSubs.unsubscribe();
    }

    if(this.fasilObyekSubs){
      this.fasilObyekSubs.unsubscribe();
    }
    if(this.fotoObyekSubs){
      this.fotoObyekSubs.unsubscribe();
    }
  }

}
