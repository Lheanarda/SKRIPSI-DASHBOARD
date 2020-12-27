import { Subscription } from 'rxjs';
import { KegiatanService } from './../../services/kegiatan.service';
import { Kegiatan } from './../../model/kegiatan.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-kegiatan',
  templateUrl: './kegiatan.component.html',
  styleUrls: ['./kegiatan.component.scss']
})
export class KegiatanComponent implements OnInit,OnDestroy {

  //data source
  kegiatans:Kegiatan[];
  load:boolean;
  kegiatanSubs:Subscription;

  //columns data
  displayedColumns:string[]=[
    'eventPOSTER',
    'eventKODE',
    'eventNAMA',
    'eventKET',
    'eventMULAI',
    'eventSELESAI',
    'create_date',
    'update_date',
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
    'Create Date',
    'Update Date',
    'Update',
    'Delete'
  ]
  constructor(private kegiatanService:KegiatanService) { }

  ngOnInit() {
    this.load = true;
    this.kegiatanService.getAllKegiatan();
    this.kegiatanSubs = this.kegiatanService.loadKegiatan.subscribe((data:Kegiatan[])=>{
      this.load = false;
      this.kegiatans = data;
    })
  }

  ngOnDestroy(){
    this.kegiatanSubs.unsubscribe();
  }
}
