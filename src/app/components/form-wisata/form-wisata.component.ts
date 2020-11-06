import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-wisata',
  templateUrl: './form-wisata.component.html',
  styleUrls: ['./form-wisata.component.scss']
})
export class FormWisataComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }
  testControl:FormControl;
  test=new Date();
  ngOnInit() {
  }

}
