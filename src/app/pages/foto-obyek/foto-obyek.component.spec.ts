/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FotoObyekComponent } from './foto-obyek.component';

describe('FotoObyekComponent', () => {
  let component: FotoObyekComponent;
  let fixture: ComponentFixture<FotoObyekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoObyekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoObyekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
