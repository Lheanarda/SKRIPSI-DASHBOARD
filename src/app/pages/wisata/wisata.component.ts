import { Subscription } from 'rxjs';
import { ObyekwisataService } from './../../services/obyekwisata.service';
import { ObyekWisata } from './../../model/obyek-wisata.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FotoWisata } from 'src/app/model/fotowisata.model';

@Component({
  selector: 'app-wisata',
  templateUrl: './wisata.component.html',
  styleUrls: ['./wisata.component.scss']
})
export class WisataComponent implements OnInit,OnDestroy {

  //data source
  obyeks:ObyekWisata[];
  load:boolean;
  obyekSubs:Subscription;

  //displayed data
  dispalyedColumn:string[]=[
    'obyekFOTO',
    'obyekKODE',
    'obyekNAMA',
    'obyekALAMAT',
    'obyekDEFINISI',
    'obyekJAMBUKA',
    'obyekJAMTUTUP',
    'obyekKETINGGIAN',
    'obyekLONGITUDE',
    'obyekDETIK_E',
    'obyekMENIT_E',
    'obyekDERAJAT_E',
    'obyekLATITUDE',
    'obyekDETIK_S',
    'obyekMENIT_S',
    'obyekDERAJAT_S',
    'obyekWAKTUKUNJUNG',
    'obyekPOPULARITAS',
    'obyekKEMUDAHAN',
    'obyekKETERANGAN',
    'kecamatanKODE',
    'kategoriKODE',
    'create_date',
    'update_date',
    'update',
    'delete'
  ];

  //header columns
  headerColumns:string[]=[
    'Foto Wisata',
    'Kode Wisata',
    'Nama Wisata',
    'Alamat Wisata',
    'Definisi Wisata',
    'Jam Buka',
    'Jam Tutup',
    'Ketinggian',
    'Longitude',
    'Detik Timur',
    'Menit Timur',
    'Derajat Timur',
    'Latitude',
    'Detik Selatan',
    'Menit Selatan',
    'Derajat Selatan',
    'Waktu Kunjung',
    'Popularitas',
    'Kemudahan Akses',
    'Keterangan',
    'Kode Kecamatan',
    'Kode Kategori',
    'Create Date',
    'Update Date',
    'Update',
    'Delete'
  ];


  constructor(private wisataService:ObyekwisataService) { }

  ngOnInit() {
    this.load = true;
    this.wisataService.getAllObyekWisata();
    this.obyekSubs = this.wisataService.loadObyekWisata.subscribe((data:ObyekWisata[])=>{
      this.load = false;
      this.obyeks = data;
    })
  }

  ngOnDestroy(){
    this.obyekSubs.unsubscribe();
  }
}
