import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-jarak',
  templateUrl: './form-jarak.component.html',
  styleUrls: ['./form-jarak.component.scss']
})
export class FormJarakComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
