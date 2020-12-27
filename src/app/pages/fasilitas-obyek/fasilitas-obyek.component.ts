import { FasilitasObyekService } from './../../services/fasilitas-obyek.service';
import { Subscription } from 'rxjs';
import { FasilitasObyek } from './../../model/fasilitas-obyek.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-fasilitas-obyek',
  templateUrl: './fasilitas-obyek.component.html',
  styleUrls: ['./fasilitas-obyek.component.scss']
})
export class FasilitasObyekComponent implements OnInit,OnDestroy {

  //data source
  fasilitasObyeks:FasilitasObyek[];
  load:boolean;
  fasilObyekSubs:Subscription;

  //columns data
  displayedColumns:string[]=[
    'fasilitasNAMA',
    'obyekNAMA',
    'fasilitasobyekKET',
    'create_date',
    'update_date',
    'update',
    'delete'
  ];

  //header data
  headerColumns:string[]=[
    'Fasilitas',
    'Obyek Wisata',
    'Keteranan Fasilitas',
    'Create Date',
    'Update Date',
    'Update',
    'Delete'
  ];

  constructor(private fasilObyekService:FasilitasObyekService) { }

  ngOnInit() {
    this.load = true;
    this.fasilObyekService.getAllFasilitasObyek();
    this.fasilObyekSubs = this.fasilObyekService.loadFasilitasObyek.subscribe((data:FasilitasObyek[])=>{
      this.load = false;
      this.fasilitasObyeks = data;
    })
  }

  ngOnDestroy(){
    this.fasilObyekSubs.unsubscribe();
  }

}
