/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormWisataComponent } from './form-wisata.component';

describe('FormWisataComponent', () => {
  let component: FormWisataComponent;
  let fixture: ComponentFixture<FormWisataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWisataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWisataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
