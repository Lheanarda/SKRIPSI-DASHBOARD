/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormKabupatenComponent } from './form-kabupaten.component';

describe('FormKabupatenComponent', () => {
  let component: FormKabupatenComponent;
  let fixture: ComponentFixture<FormKabupatenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormKabupatenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKabupatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
