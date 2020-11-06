/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormKategoriWisataComponent } from './form-kategori-wisata.component';

describe('FormKategoriWisataComponent', () => {
  let component: FormKategoriWisataComponent;
  let fixture: ComponentFixture<FormKategoriWisataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormKategoriWisataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKategoriWisataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
