import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-foto-wisata',
  templateUrl: './form-foto-wisata.component.html',
  styleUrls: ['./form-foto-wisata.component.scss']
})
export class FormFotoWisataComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
