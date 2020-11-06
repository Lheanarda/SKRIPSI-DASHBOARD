import { KategoriwisataService } from './../../services/kategoriwisata.service';
import { KategoriWisata } from './../../model/kategori-wisata.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kategori-wisata',
  templateUrl: './kategori-wisata.component.html',
  styleUrls: ['./kategori-wisata.component.scss']
})
export class KategoriWisataComponent implements OnInit {

  //data source
  kategoris:KategoriWisata[];

  //columns data
  displayedColumn:string[]=[
    'select',
    'kategoriKODE',
    'kategoriNAMA',
    'kategoriKET',
    'kategoriREFERENCE',
    'update',
    'delete'
  ];

  //header columns
  headerColumns:string[]=[
    'Kode Kategori',
    'Nama Kategori',
    'Keterangan Kategori',
    'Referensi Kategori',
    'update',
    'delete'
  ]

  constructor(private katWisService:KategoriwisataService) { }

  ngOnInit() {
    this.kategoris = this.katWisService.kategoris;
  }

}
