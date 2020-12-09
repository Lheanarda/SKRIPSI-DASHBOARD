import { JarakService } from './../../services/jarak.service';
import { Component, OnInit } from '@angular/core';
import { Jarak } from 'src/app/model/jarak.model';

@Component({
  selector: 'app-jarak',
  templateUrl: './jarak.component.html',
  styleUrls: ['./jarak.component.scss']
})
export class JarakComponent implements OnInit {

  //data source
  jaraks:Jarak[];


  //columns data
  displayedColumns:string[]=[
    'select',
    'obyekKODEasal',
    'obyekKODEtujuan',
    'obyekjarak',
    'obyektempuh',
    'obyekRUTE',
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
    'Update',
    'Delete'
  ]
  constructor(private jarakService:JarakService) { }

  ngOnInit() {
    this.jaraks = this.jarakService.jaraks;
  }

}
