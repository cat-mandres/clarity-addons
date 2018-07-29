/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SliderSize } from './slider-size.enum';
import { SliderValueType } from './slider-value-type.enum';
import { ClrRange } from './range';

@Component({
  selector: 'clr-slider',
  templateUrl: './slider.html',
})
export class ClrSlider implements OnInit {
  ngOnInit(): void {
    this.updateSliderBackground();
  }

  @Output('clrValueChanged') onValueChanged: EventEmitter<any> = new EventEmitter(false);
  @ViewChild('rangeSliderComponent') private _rangeSliderComponent: ClrRange;
  @ViewChild('singleValueComponent') private _singleValueComponent: ElementRef;

  @Input('clrShowsLabels') showLabels: boolean = true;
  @Input('clrEnableValueFields') enableValueFields: boolean = true;
  @Input('clrMultiValue') multiValue: boolean = false;
  @Input('clrSliderSize') size: SliderSize = SliderSize.medium;

  // ====== Events ======
  private onMinValueChange(newMinValue: number): void {
    this._minValue = newMinValue;

    this.updateValue();
  }

  private onMaxValueChange(newMaxValue: number): void {
    this._maxValue = newMaxValue;

    this.updateValue();
  }

  // == Private Fields ==
  private _minValue = 0;
  private _maxValue = 50;
  private _step = 1;
  private _value = 0;

  // ====== Getter ======
  public get value(): number {
    return this._value;
  }

  public get minValue(): number {
    return this.inverted ? this._maxValue : this._minValue;
  }

  public get maxValue(): number {
    return this.inverted ? this._minValue : this._maxValue;
  }

  public get step(): number {
    return this._step;
  }

  public get rangeSliderComponent(): ClrRange {
    return this._rangeSliderComponent;
  }

  public get inverted(): boolean {
    return this._maxValue < this._minValue;
  }

  // ====== Setter ======
  @Input('clrValue')
  public set value(value: number) {
    const newvalue = this.clamp(value, this.minValue, this.maxValue);

    if (newvalue === this._value) {
      return;
    }

    this._value = newvalue;
    this.updateSliderBackground();
    this.onValueChanged.emit({ valueType: SliderValueType.value, value: value });
  }

  @Input('clrMinValue')
  public set minValue(min: number) {
    if (!this.enableValueFields) {
      return;
    }

    this.onMinValueChange(min);
  }

  @Input('clrMaxValue')
  public set maxValue(max: number) {
    if (!this.enableValueFields) {
      return;
    }

    this.onMaxValueChange(max);
  }

  @Input('clrStep')
  public set step(step: number) {
    this._step = step > 0 ? step : 1;
  }

  // ====== Tools ======
  private updateValue(): void {
    this.value = this._value;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  private calculateValuePointForBackground(): string {
    return 100 * ((this.value - this.minValue) / (this.maxValue - this.minValue)) + 1 + '%';
  }

  private updateSliderBackground() {
    this._singleValueComponent.nativeElement.style.setProperty('--value', this.calculateValuePointForBackground());
  }
}
