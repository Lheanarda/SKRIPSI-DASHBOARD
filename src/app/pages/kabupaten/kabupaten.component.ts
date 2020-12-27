import { Subscription } from 'rxjs';
import { Kabupaten } from './../../model/kabupaten.model';
import { KabupatenService } from './../../services/kabupaten.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-kabupaten',
  templateUrl: './kabupaten.component.html',
  styleUrls: ['./kabupaten.component.scss']
})
export class KabupatenComponent implements OnInit, OnDestroy {

  //data source
  kabupatens:Kabupaten[];
  load:Boolean;
  kabupatenSubs:Subscription;

  //columns data
  displayedColumns:string[]=[
    'kabupatenFOTOICON',
    'kabupatenKODE',
    'kabupatenNAMA',
    'kabupatenALAMAT',
    'kabupatenKET',
    'kabupatenFOTOICONKET',
    'create_date',
    'update_date',
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
    'Create Date',
    'Update Date',
    'Update',
    'Delete'
  ]

  constructor(private kabService:KabupatenService) { }

  ngOnInit() {
    this.load = true;
    this.kabService.getAllKabupaten();
    this.kabupatenSubs = this.kabService.loadKabupaten.subscribe((data:Kabupaten[])=>{
      this.load = false;
      this.kabupatens = data;
    })
  }

  ngOnDestroy(){
    console.log('kabupaten page destroyed');
    this.kabupatenSubs.unsubscribe();
  }
}
