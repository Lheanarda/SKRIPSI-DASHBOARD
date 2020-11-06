import { KabupatenService } from './../../services/kabupaten.service';
import { Component, OnInit } from '@angular/core';
import { Kabupaten } from 'src/app/model/kabupaten.model';

@Component({
  selector: 'app-kabupaten',
  templateUrl: './kabupaten.component.html',
  styleUrls: ['./kabupaten.component.scss']
})
export class KabupatenComponent implements OnInit {

  //data source
  kabupatens:Kabupaten[];


  //columns data
  displayedColumns:string[]=[
    'select',
    'kabupatenFOTOICON',
    'kabupatenKODE',
    'kabupatenNAMA',
    'kabupatenALAMAT',
    'kabupatenKET',
    'kabupatenFOTOICONKET',
    'update',
    'delete'
  ];

  //header columns
  headerColumns:string[]=[
    'Icon Kabupaten',
    'Kode Kabupaten',
    'Nama Kabupaten',
    'Alamat Kabupaten',
    'Keterangan Kabupaten',
    'Keterangan Icon',
    'Update',
    'Delete'
  ]

  constructor(private kabService:KabupatenService) { }

  ngOnInit() {
    this.kabupatens = this.kabService.kabupaten;
  }

}
