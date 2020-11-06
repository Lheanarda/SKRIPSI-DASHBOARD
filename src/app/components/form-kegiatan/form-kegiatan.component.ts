import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-kegiatan',
  templateUrl: './form-kegiatan.component.html',
  styleUrls: ['./form-kegiatan.component.scss']
})
export class FormKegiatanComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
