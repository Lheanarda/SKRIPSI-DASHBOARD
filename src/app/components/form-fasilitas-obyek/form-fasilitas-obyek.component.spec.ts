/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormFasilitasObyekComponent } from './form-fasilitas-obyek.component';

describe('FormFasilitasObyekComponent', () => {
  let component: FormFasilitasObyekComponent;
  let fixture: ComponentFixture<FormFasilitasObyekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFasilitasObyekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFasilitasObyekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
