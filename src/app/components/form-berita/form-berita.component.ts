import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-form-berita',
  templateUrl: './form-berita.component.html',
  styleUrls: ['./form-berita.component.scss']
})
export class FormBeritaComponent implements OnInit {

  //init editor
  Editor = ClassicEditor;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
