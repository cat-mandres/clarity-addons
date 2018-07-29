/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ClrRange } from './range';

describe('RangeComponent', () => {
  let component: ClrRange;
  let fixture: ComponentFixture<ClrRange>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClrRange],
      imports: [ClarityModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrRange);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
