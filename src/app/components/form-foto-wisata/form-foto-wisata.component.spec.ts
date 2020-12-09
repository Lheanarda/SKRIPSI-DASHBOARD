/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormFotoWisataComponent } from './form-foto-wisata.component';

describe('FormFotoWisataComponent', () => {
  let component: FormFotoWisataComponent;
  let fixture: ComponentFixture<FormFotoWisataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFotoWisataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFotoWisataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
