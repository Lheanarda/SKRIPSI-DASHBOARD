/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BeritaComponent } from './berita.component';

describe('BeritaComponent', () => {
  let component: BeritaComponent;
  let fixture: ComponentFixture<BeritaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeritaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
