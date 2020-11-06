/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JarakComponent } from './jarak.component';

describe('JarakComponent', () => {
  let component: JarakComponent;
  let fixture: ComponentFixture<JarakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JarakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JarakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
