import { FotoWisataService } from './../../services/foto-wisata.service';
import { Subscription } from 'rxjs';
import { FotoWisata } from './../../model/fotowisata.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-foto-obyek',
  templateUrl: './foto-obyek.component.html',
  styleUrls: ['./foto-obyek.component.scss']
})
export class FotoObyekComponent implements OnInit,OnDestroy {


  //data source
  fotoWisatas:FotoWisata[];
  load:boolean;
  fotoWisataSubs:Subscription;

  //columns data
  displayedColumns:string[]=[
    'fotoobyekGAMBAR',
    'fotoobyekKODE',
    'fotoobyekNAMA',
    'fotoobyekKET',
    'fotoobyekTGLAMBIL',
    'obyekKODE',
    'create_date',
    'update_date',
    'update',
    'delete'
  ];

  //header columns
  headerColumns:string[]=[
    'Foto Wisata',
    'Kode Foto Wisata',
    'Nama Foto Wisata',
    'Keterangan Foto',
    'Tanggal Ambil',
    'Obyek Wisata',
    'Create Date',
    'Update Date',
    'Update',
    'Delete'
  ]

  constructor(private fotoService:FotoWisataService) { }

  ngOnInit() {
    this.load = true;
    this.fotoService.getAllFotoWisata();
    this.fotoWisataSubs = this.fotoService.loadFotoWisata.subscribe((data:FotoWisata[])=>{
      this.load = false;
      this.fotoWisatas = data;
    })
  }

  ngOnDestroy(){
    this.fotoWisataSubs.unsubscribe();
  }

}
