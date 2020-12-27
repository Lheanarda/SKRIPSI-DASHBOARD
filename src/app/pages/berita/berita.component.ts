import { Subscription } from 'rxjs';
import { BeritaFoto } from './../../model/beritafoto.model';
import { BeritaService } from './../../services/berita.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Berita } from 'src/app/model/berita.model';
@Component({
  selector: 'app-berita',
  templateUrl: './berita.component.html',
  styleUrls: ['./berita.component.scss']
})
export class BeritaComponent implements OnInit,OnDestroy {

  //data source
  beritas:Berita[];
  load:boolean;
  beritaSubs:Subscription;

  //columns data
  displayedColumns:string[]=[
    'beritaGAMBAR',
    'beritaKODE',
    'beritaJUDUL',
    'beritaISI',
    'beritaTGL',
    'beritaSUMBER',
    'kategoriberitaKODE',
    'kabupatenKODE',
    'eventKODE',
    'create_date',
    'update_date',
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
    'Create Date',
    'Update Date',
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
    this.load = true;
    this.beritaService.getAllBerita();
    this.beritaSubs = this.beritaService.loadBerita.subscribe((data:Berita[])=>{
      this.load = false;
      this.beritas = data;
    })
  }

  ngOnDestroy(){
    this.beritaSubs.unsubscribe();
  }

}
