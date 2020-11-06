import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-kategori-wisata',
  templateUrl: './form-kategori-wisata.component.html',
  styleUrls: ['./form-kategori-wisata.component.scss']
})
export class FormKategoriWisataComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
