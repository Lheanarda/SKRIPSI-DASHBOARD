import { ObyekwisataService } from './../../services/obyekwisata.service';
import { ObyekWisata } from './../../model/obyek-wisata.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wisata',
  templateUrl: './wisata.component.html',
  styleUrls: ['./wisata.component.scss']
})
export class WisataComponent implements OnInit {

  //data source
  obyeks:ObyekWisata[];

  //displayed data
  dispalyedColumn:string[]=[
    'select',
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
    'Update',
    'Delete'
  ]
  constructor(private wisataService:ObyekwisataService) { }

  ngOnInit() {
    this.obyeks = this.wisataService.obyeks
  }

}
