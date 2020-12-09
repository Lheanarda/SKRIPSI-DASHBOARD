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
  constructor(
    public dialog:MatDialog ,
    private kabService:KabupatenService,
    private kecService:KecamatanService,
    private snackbar:MatSnackBar) { }

  ngOnInit() {
    //init data on load
    this.initiateDataSource(this.listSource);

    //kabupaten subs
    this.kabupatenSubs =  this.kabService.loadKabupaten.subscribe((data:Kabupaten[])=>{
      this.initiateDataSource(data);
    })

    this.kecamatanSubs = this.kecService.loadKecamatan.subscribe((data:Kecamatan[])=>{
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
        dialogRef = this.dialog.open(FormJarakComponent,{data:{title:this.title,mode:mode,el:el},disableClose:true});
        break;
      case 'fasilitas obyek wisata':
        dialogRef = this.dialog.open(FormFasilitasObyekComponent,{data:{title:this.title,mode:mode,el:el},disableClose:true});
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
            });
            break;
          case 'kategori berita':
            console.log(el.kategoriberitaKODE);
            break;
          case 'kecamatan':
            this.deleteLoading = true;
            this.kecService.deleteKecamatan(el.kecamatanKODE).subscribe((response:any)=>{
              console.log(response);
              this.deleteLoading = false;
              this.snackbar.open(response.messages[0],'Dismiss!',{duration:3000});
              this.kecService.getAllKecamatan();
            });
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
      console.log('list table kabupaten destroyed');
      this.kabupatenSubs.unsubscribe();
    }

    if(this.kecamatanSubs){
      console.log("List Tabel kecamatan destroyed");
      this.kecamatanSubs.unsubscribe();
    }
  }

}
