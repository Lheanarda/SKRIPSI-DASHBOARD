import { Subscription } from 'rxjs';
import { KategoriwisataService } from './../../services/kategoriwisata.service';
import { KategoriWisata } from './../../model/kategori-wisata.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-kategori-wisata',
  templateUrl: './kategori-wisata.component.html',
  styleUrls: ['./kategori-wisata.component.scss']
})
export class KategoriWisataComponent implements OnInit, OnDestroy {

  //data source
  kategoris:KategoriWisata[];
  load:Boolean;
  kategoriSubs:Subscription;

  //columns data
  displayedColumn:string[]=[
    'select',
    'kategoriKODE',
    'kategoriNAMA',
    'kategoriKET',
    'kategoriREFERENCE',
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
    'Referensi Kategori',
    'Create Date',
    'Update Date',
    'update',
    'delete'
  ]

  constructor(private katWisService:KategoriwisataService) { }

  ngOnInit() {

    this.load =true;
    this.katWisService.getAllKategoriWisata();
    this.kategoriSubs = this.katWisService.loadKategoriWisata.subscribe((data:KategoriWisata[])=>{
      this.load = false;
      this.kategoris = data;
    })
  }

  ngOnDestroy(){
    console.log('kategori wisata page destroyed');
    this.kategoriSubs.unsubscribe();
  }

}
