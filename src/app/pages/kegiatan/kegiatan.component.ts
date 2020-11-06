import { KegiatanService } from './../../services/kegiatan.service';
import { Kegiatan } from './../../model/kegiatan.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kegiatan',
  templateUrl: './kegiatan.component.html',
  styleUrls: ['./kegiatan.component.scss']
})
export class KegiatanComponent implements OnInit {

  //data source
  kegiatans:Kegiatan[];

  //columns data
  displayedColumns:string[]=[

    'select',
    'eventPOSTER',
    'eventKODE',
    'eventNAMA',
    'eventKET',
    'eventMULAI',
    'eventSELESAI',
    'update',
    'delete'
  ];

  //header columns
  headerColumns:string[]=[
    'Poster Event',
    'Kode Event',
    'Nama Event',
    'Keterangan Event',
    'Tanggal Mulai',
    'Tanggal Selesai',
    'Update',
    'Delete'
  ]
  constructor(private kegiatanService:KegiatanService) { }

  ngOnInit() {
    this.kegiatans = this.kegiatanService.kegiatans;
  }

}
