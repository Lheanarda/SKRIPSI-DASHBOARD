/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KabupatenComponent } from './kabupaten.component';

describe('KabupatenComponent', () => {
  let component: KabupatenComponent;
  let fixture: ComponentFixture<KabupatenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KabupatenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KabupatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
