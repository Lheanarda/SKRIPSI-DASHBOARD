import { FasilitasObyek } from './../../model/fasilitas-obyek.model';
import { FasilitasService } from './../../services/fasilitas.service';
import { Component, OnInit } from '@angular/core';
import { Fasilitas } from 'src/app/model/fasilitas.model';

@Component({
  selector: 'app-fasilitas',
  templateUrl: './fasilitas.component.html',
  styleUrls: ['./fasilitas.component.scss']
})
export class FasilitasComponent implements OnInit {

  //data source
  fasilitass:Fasilitas[];

  //displayed data
  displayedColumn:string[]=[
    'select',
    'fasilitasKODE',
    'fasilitasNAMA',
    'fasilitasGUNA',
    'update',
    'delete'
  ];

  //header columns
  headerColumns:string[]=[
    'Kode Fasilitas',
    'Nama Fasilitas',
    'Kegunaan Fasilitas',
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
    this.fasilitass = this.fasilitasService.fasilitass;
    this.fasilitasObyeks = this.fasilitasService.fasilitasObyeks
  }

}
