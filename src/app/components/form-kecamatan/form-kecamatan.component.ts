import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-kecamatan',
  templateUrl: './form-kecamatan.component.html',
  styleUrls: ['./form-kecamatan.component.scss']
})
export class FormKecamatanComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
