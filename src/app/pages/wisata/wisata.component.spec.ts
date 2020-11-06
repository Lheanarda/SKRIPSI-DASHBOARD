/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WisataComponent } from './wisata.component';

describe('WisataComponent', () => {
  let component: WisataComponent;
  let fixture: ComponentFixture<WisataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WisataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WisataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
