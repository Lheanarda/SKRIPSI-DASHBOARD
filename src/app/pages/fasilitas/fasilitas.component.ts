import { Subscription } from 'rxjs';
import { FasilitasObyek } from './../../model/fasilitas-obyek.model';
import { FasilitasService } from './../../services/fasilitas.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fasilitas } from 'src/app/model/fasilitas.model';

@Component({
  selector: 'app-fasilitas',
  templateUrl: './fasilitas.component.html',
  styleUrls: ['./fasilitas.component.scss']
})
export class FasilitasComponent implements OnInit,OnDestroy {

  //data source
  fasilitass:Fasilitas[];
  load:boolean;
  fasilitasSubs:Subscription;

  //displayed data
  displayedColumn:string[]=[
    'fasilitasKODE',
    'fasilitasNAMA',
    'fasilitasGUNA',
    'create_date',
    'update_date',
    'update',
    'delete'
  ];

  //header columns
  headerColumns:string[]=[
    'Kode Fasilitas',
    'Nama Fasilitas',
    'Kegunaan Fasilitas',
    'Create Date',
    'Update Date',
    'Update',
    'Delete'
  ];

  //data source
  fasilitasObyeks:FasilitasObyek[];
  dispalyedColumnsObyek:string[]=[
    'select',
    'fasilitasNAMA',
    'obyekNAMA',
    'fasilitasobyekKET',
    'update',
    'delete'
  ];

  headerColumnsObyek:string[]=[
    'Nama Fasilitas',
    'Nama Obyek Wisata',
    'Keterangan Fasilitas Wisata',
    'Update',
    'Delete'
  ]

  constructor(private fasilitasService:FasilitasService) { }

  ngOnInit() {

    this.load = true;
    this.fasilitasService.getAllFasilitas();
    this.fasilitasSubs = this.fasilitasService.loadFasilitas.subscribe((data:Fasilitas[])=>{
      this.load  = false;
      this.fasilitass = data;
    })
  }

  ngOnDestroy(){
    this.fasilitasSubs.unsubscribe();
  }
}
