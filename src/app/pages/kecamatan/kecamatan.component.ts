import { Kecamatan } from './../../model/kecamatan.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { KecamatanService } from 'src/app/services/kecamatan.service';

@Component({
  selector: 'app-kecamatan',
  templateUrl: './kecamatan.component.html',
  styleUrls: ['./kecamatan.component.scss']
})
export class KecamatanComponent implements OnInit,OnDestroy {

  //data source
  kecamatan:Kecamatan[];
  load:Boolean;
  kecamatanSubs:Subscription;

  //displayed data
  displayedColumn:string[]=[
    'kecamatanKODE',
    'kecamatanNAMA',
    'kecamatanALAMAT',
    'kecamatanKET',
    'kabupatenKODE',
    'create_date',
    'update_date',
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
    'Create Date',
    'Update Date',
    'Update',
    'Delete'
  ]

  constructor(private kecService:KecamatanService) { }

  ngOnInit() {
    this.load = true;
    this.kecService.getAllKecamatan();
    this.kecamatanSubs = this.kecService.loadKecamatan.subscribe((data:Kecamatan[])=>{
      this.load = false;
      this.kecamatan=data;
    })
  }

  ngOnDestroy(){
    console.log('Kecamatan page destroyed');
    this.kecamatanSubs.unsubscribe();
  }

}
