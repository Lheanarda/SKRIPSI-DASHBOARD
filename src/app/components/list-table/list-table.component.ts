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
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { config } from 'process';
import { SelectionModel } from '@angular/cdk/collections';
import { FormKategoriWisataComponent } from '../form-kategori-wisata/form-kategori-wisata.component';

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

  //loading
  deleteLoading:Boolean = false;

  //Selecttion
  selection = new SelectionModel(true,[]);

  constructor(
    public dialog:MatDialog ,
    private router:Router) { }

  ngOnInit() {
    //init data on load
    this.initiateDataSource(this.listSource);


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


  onManipulate(mode:'new'|'edit', id?:number){
    let dialogRef;
    switch (this.title.toLowerCase()){
      case 'kabupaten':
        dialogRef = this.dialog.open(FormKabupatenComponent,{data:{title:this.title,mode:mode, id:id}});
        dialogRef.afterClosed().subscribe(result=>{

        });
        break;
      case 'kegiatan':
        dialogRef = this.dialog.open(FormKegiatanComponent,{data:{title:this.title,mode:mode,id:id}});
        dialogRef.afterClosed().subscribe(result=>{

        })
        break;
      case 'kategori berita':
        dialogRef = this.dialog.open(FormKategoriBeritaComponent,{data:{title:this.title,mode:mode,id:id}});
        dialogRef.afterClosed().subscribe(result=>{});
        break;
      case 'kategori wisata':
        dialogRef = this.dialog.open(FormKategoriWisataComponent,{data:{title:this.title,mode:mode,id:id}});
        dialogRef.afterClosed().subscribe(result=>{});
        break;
      case 'fasilitas':
        dialogRef = this.dialog.open(FormFasilitasComponent,{data:{title:this.title,mode:mode,id:id}});
        dialogRef.afterClosed().subscribe(result=>{});
        break;
      case 'kecamatan':
        dialogRef = this.dialog.open(FormKecamatanComponent,{data:{title:this.title,mode:mode,id:id}});
        dialogRef.afterClosed().subscribe(result=>{});
        break;
      case 'obyek wisata':
        dialogRef = this.dialog.open(FormWisataComponent,{data:{title:this.title,mode:mode,id:id}});
        dialogRef.afterClosed().subscribe(result=>{});
        break;
      case 'berita':
        dialogRef = this.dialog.open(FormBeritaComponent,{data:{title:this.title,mode:mode,id:id}});
        dialogRef.afterClosed().subscribe(result=>{});
        break;
    }


  }
  openDialogDelete(mode:'one'|'bulk', id:any){
    console.log(id)
    //delete function
    let dialogRef = this.dialog.open(DialogDeleteComponent,{data:{title:this.title, id:id, mode}});
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


  readDeleteId(){
    if(this.title.toLowerCase()==='kabupaten'){
      return 'kabupatenKODE'
    }else if (this.title.toLowerCase()==='kegiatan'){
      return 'eventKODE'
    }else if (this.title.toLowerCase()==='kategori berita'){
      return 'kategoriberitaKODE'
    }else if (this.title.toLowerCase()==='kategori wisata'){
      return 'kategoriKODE'
    }else if (this.title.toLowerCase()==='fasilitas'){
      return 'fasilitasKODE'
    }else if (this.title.toLowerCase()==='kecamatan'){
      return 'kecamatanKODE'
    }else if (this.title.toLowerCase()==='obyek wisata'){
      return 'obyekKODE'
    }else if (this.title.toLowerCase()==='berita'){
      return 'beritaKODE'
    }
  }

  helperConditionListTable(displayedColumn:string, value:string){
    if(displayedColumn===value) return true;
    else return false;
  }

  ngOnDestroy(){
  }

}
