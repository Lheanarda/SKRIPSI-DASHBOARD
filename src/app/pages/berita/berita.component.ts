import { BeritaFoto } from './../../model/beritafoto.model';
import { BeritaService } from './../../services/berita.service';
import { Component, OnInit } from '@angular/core';
import { Berita } from 'src/app/model/berita.model';
@Component({
  selector: 'app-berita',
  templateUrl: './berita.component.html',
  styleUrls: ['./berita.component.scss']
})
export class BeritaComponent implements OnInit {

  //data source
  beritas:Berita[];

  //columns data
  displayedColumns:string[]=[
    'select',
    'beritaGAMBAR',
    'beritaKODE',
    'beritaJUDUL',
    'beritaISI',
    'beritaTGL',
    'beritaSUMBER',
    'kategoriberitaKODE',
    'kabupatenKODE',
    'eventKODE',
    'update',
    'delete'
  ];

  //header columns
  headerColumns:string[]=[
    'Thumbnail Berita',
    'Kode Berita',
    'Judul berita',
    'Isi Berita',
    'Tanggal Berita',
    'Sumber Berita',
    'Kode Kategori Berita',
    'Kode Kabupaten',
    'Kode Event',
    'Update',
    'Delete'
  ];


  //data source
  beritaFotos:BeritaFoto[];
  //columns data
  displayedColumnsFoto:string[]=[
    'beritafotoGAMBAR',
    'JUDUL',
    'beritafotoKODE',
    'beritafotoNAMA'
  ];

  //header colmns
  headerColumnsFoto:string[]=[
    'Gambar Berita',
    'Judul Berita',
    'Kode foto Berita',
    'Nama Foto Berita'
  ]
  constructor(private beritaService:BeritaService) { }

  ngOnInit() {
    this.beritas = this.beritaService.beritas;
    this.beritaFotos = this.beritaService.beritafotos;
  }

}
