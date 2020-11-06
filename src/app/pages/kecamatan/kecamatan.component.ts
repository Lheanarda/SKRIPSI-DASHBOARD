import { Component, OnInit } from '@angular/core';
import { Kecamatan } from 'src/app/model/kecamatan.model';
import { KecamatanService } from 'src/app/services/kecamatan.service';

@Component({
  selector: 'app-kecamatan',
  templateUrl: './kecamatan.component.html',
  styleUrls: ['./kecamatan.component.scss']
})
export class KecamatanComponent implements OnInit {

  //data source
  kecamatan:Kecamatan[];

  //displayed data
  displayedColumn:string[]=[
    'select',
    'kecamatanKODE',
    'kecamatanNAMA',
    'kecamatanALAMAT',
    'kecamatanKET',
    'kabupatenKODE',
    'update',
    'delete'
  ];

  //header columns
  headerColumns:string[]=[
    'Kode Kecamatan',
    'Nama Kecamatan',
    'Alamat Kecamatan',
    'Keterangan Kecamatan',
    'Kode Kabupaten',
    'Update',
    'Delete'
  ]

  constructor(private kecService:KecamatanService) { }

  ngOnInit() {
    this.kecamatan = this.kecService.kecamatan;
  }

}
