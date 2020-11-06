import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-kategori-berita',
  templateUrl: './form-kategori-berita.component.html',
  styleUrls: ['./form-kategori-berita.component.scss']
})
export class FormKategoriBeritaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
