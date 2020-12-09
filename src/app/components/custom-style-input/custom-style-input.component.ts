import { Subscription } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-style-input',
  templateUrl: './custom-style-input.component.html',
  styleUrls: ['./custom-style-input.component.scss']
})
export class CustomStyleInputComponent implements OnInit {

  //INPUT
  @Input() type:string;
  @Input() placeholder:string;
  //OUTPUT
  @Output() valueChange = new EventEmitter<any>();

  //SUBS
  subscription:Subscription;

  //FORM CONTROL
  inputControl = new FormControl(null,Validators.required);

  //BASIC VAR
  visibility:string='visibility';

  constructor() { }

  ngOnInit() {
    this.inputControl.valueChanges.subscribe(val=>{
      this.valueChange.emit(val);
    })
  }

  getValidatorBorderColor(){
    if (this.inputControl.touched){
      return this.inputControl.valid?'3px solid var(--color-primary)' : '3px solid var(--color-red-light)';
    }
  }

  onChangeVisibility(){
    this.type = this.type=="text"?this.type="password":this.type="text";
    this.visibility = this.visibility == 'visibility'?this.visibility = 'visibility_off' : this.visibility='visibility';
  }

  ngOnDestroy(){

  }
}
