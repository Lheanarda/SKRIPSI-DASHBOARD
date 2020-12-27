import { Subscription } from 'rxjs';
import { JarakService } from './../../services/jarak.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Jarak } from 'src/app/model/jarak.model';

@Component({
  selector: 'app-jarak',
  templateUrl: './jarak.component.html',
  styleUrls: ['./jarak.component.scss']
})
export class JarakComponent implements OnInit,OnDestroy {

  //data source
  jaraks:Jarak[];
  load:boolean;
  jarakSubs:Subscription;

  //columns data
  displayedColumns:string[]=[
    'namaASAL',
    'namaTUJUAN',
    'obyekjarak',
    'obyektempuh',
    'obyekRUTE',
    'create_date',
    'update_date',
    'update',
    'delete'
  ]

  //header data
  headerColumns:string[]=[
    'Destinasi Awal',
    'Destinasi Tujuan',
    'Jarak (KM)',
    'Waktu Tempuh (menit)',
    'Keterangan Rute',
    'Create Date',
    'Update Date',
    'Update',
    'Delete'
  ]
  constructor(private jarakService:JarakService) { }

  ngOnInit() {
    this.load = true;
    this.jarakService.getAllJarakObyek();
    this.jarakSubs = this.jarakService.loadJarak.subscribe((data:Jarak[])=>{
      this.load = false;
      this.jaraks = data;
    })
  }

  ngOnDestroy(){
    this.jarakSubs.unsubscribe();
  }
}
