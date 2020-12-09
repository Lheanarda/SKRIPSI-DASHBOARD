import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-fasilitas-obyek',
  templateUrl: './form-fasilitas-obyek.component.html',
  styleUrls: ['./form-fasilitas-obyek.component.scss']
})
export class FormFasilitasObyekComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
