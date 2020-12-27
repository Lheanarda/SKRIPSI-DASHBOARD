import { Subscription } from 'rxjs';
import { KategoriberitaService } from './../../services/kategoriberita.service';
import { KategoriBerita } from './../../model/kategori-berita.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-kategori-berita',
  templateUrl: './kategori-berita.component.html',
  styleUrls: ['./kategori-berita.component.scss']
})
export class KategoriBeritaComponent implements OnInit,OnDestroy {

  //data source
  kategoris:KategoriBerita[];
  load:boolean;
  kategoriSubs:Subscription;

  //columns data
  displayedColumn:string[]=[
    'kategoriberitaKODE',
    'kategoriberitaNAMA',
    'kategoriberitaKET',
    'create_date',
    'update_date',
    'update',
    'delete'
  ];

  //header columns
  headerColumns:string[]=[
    'Kode Kategori',
    'Nama Kategori',
    'Keterangan Kategori',
    'Create Date',
    'Update Date',
    'Update',
    'Delete'
  ]

  constructor(private kateBeritaService:KategoriberitaService) { }

  ngOnInit() {
    this.kateBeritaService.getAllKategoriBerita();
    this.load = true;
    this.kategoriSubs = this.kateBeritaService.loadKategoriBerita.subscribe((data:KategoriBerita[])=>{
      this.load = false;
      this.kategoris = data;
    })
  }

  ngOnDestroy(){
    this.kategoriSubs.unsubscribe();
  }

}
