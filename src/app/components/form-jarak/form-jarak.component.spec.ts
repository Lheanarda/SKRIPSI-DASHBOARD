/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormJarakComponent } from './form-jarak.component';

describe('FormJarakComponent', () => {
  let component: FormJarakComponent;
  let fixture: ComponentFixture<FormJarakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormJarakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormJarakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
