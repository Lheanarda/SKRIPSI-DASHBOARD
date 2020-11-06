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
  ]
  constructor(private beritaService:BeritaService) { }

  ngOnInit() {
    this.beritas = this.beritaService.beritas;
  }

}
