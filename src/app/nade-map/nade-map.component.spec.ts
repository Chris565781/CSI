/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NadeMapComponent } from './nade-map.component';

describe('NadeMapComponent', () => {
  let component: NadeMapComponent;
  let fixture: ComponentFixture<NadeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
