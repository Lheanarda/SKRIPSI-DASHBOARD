import { KategoriberitaService } from './../../services/kategoriberita.service';
import { KategoriBerita } from './../../model/kategori-berita.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kategori-berita',
  templateUrl: './kategori-berita.component.html',
  styleUrls: ['./kategori-berita.component.scss']
})
export class KategoriBeritaComponent implements OnInit {

  //data source
  kategoris:KategoriBerita[];

  //columns data
  displayedColumn:string[]=[
    'select',
    'kategoriberitaKODE',
    'kategoriberitaNAMA',
    'kategoriberitaKET',
    'update',
    'delete'
  ];

  //header columns
  headerColumns:string[]=[
    'Kode Kategori',
    'Nama Kategori',
    'Keterangan Kategori',
    'Update',
    'Delete'
  ]

  constructor(private kateBeritaService:KategoriberitaService) { }

  ngOnInit() {
    this.kategoris = this.kateBeritaService.kategoris;
  }

}
