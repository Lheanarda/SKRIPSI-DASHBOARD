import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-fasilitas',
  templateUrl: './form-fasilitas.component.html',
  styleUrls: ['./form-fasilitas.component.scss']
})
export class FormFasilitasComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
