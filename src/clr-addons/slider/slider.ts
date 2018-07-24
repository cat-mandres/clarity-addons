/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SliderSize } from './slidersize.enum';
import { SliderValueType } from './slidervaluetype.enum';
import { ClrRange } from './range';

@Component({
  selector: 'clr-slider',
  templateUrl: './slider.html',
})
export class ClrSlider {
  @Output('clrValueChanged') onValueChanged: EventEmitter<any> = new EventEmitter(false);
  @ViewChild('rangeSliderComponent') private _rangeSliderComponent: ClrRange;

  // ====== Events ======
  valueChanged(value): void {
    this.onValueChanged.emit(value);
    switch (value.valueType) {
      case SliderValueType.value:
        this._value = value.value;
        break;
      case SliderValueType.lowvalue:
        this._lowValue = +value.value.split(',')[0];
        break;
      case SliderValueType.highvalue:
        this._highValue = +value.value.split(',')[1];
        break;
      default:
        break;
    }
  }

  onMinValueChange(newMinValue: number): void {
    this._minValue = newMinValue;
  }

  onMaxValueChange(newMaxValue: number): void {
    this._maxValue = newMaxValue;
  }

  // == Private Fields ==
  private _highValue = 50;
  private _minValue = 0;
  private _lowValue = 0;
  private _maxValue = 50;
  private _step = 1;
  private _value = 0;
  private _multiValue = false;
  private _showsLabels = true;
  private _enableValueFields = true;
  private _size = SliderSize.medium;

  // ====== Getter ======
  public get value(): number {
    return this._value;
  }

  public get minValue(): number {
    return this._minValue;
  }

  public get maxValue(): number {
    return this._maxValue;
  }

  public get step(): number {
    return this._step;
  }

  public get showsLabels(): boolean {
    return this._showsLabels;
  }

  public get sliderSize(): SliderSize {
    return this._size;
  }

  public get valueFieldsAreEnabled(): boolean {
    return this._enableValueFields;
  }

  public get multiValue(): boolean {
    return this._multiValue;
  }

  public get rangeSliderComponent(): ClrRange {
    return this._rangeSliderComponent;
  }

  // ====== Setter ======
  @Input('clrValue')
  public set value(value: number) {
    const newvalue = Math.min(Math.max(value, this._minValue), this._maxValue);

    if (newvalue === this._value) {
      return;
    }

    this._value = newvalue;
    this.onValueChanged.emit({ valueType: SliderValueType.value, value: value });
  }

  @Input('clrMinValue')
  public set minValue(min: number) {
    if (!this._enableValueFields) {
      return;
    }

    if (min > this._maxValue) {
      this._minValue = this._maxValue;
      this._maxValue = min;
    } else {
      this._minValue = min;
    }

    this.updateValue();
  }

  @Input('clrMaxValue')
  public set maxValue(max: number) {
    if (!this._enableValueFields) {
      return;
    }

    if (max < this._minValue) {
      this._maxValue = this._minValue;
      this._minValue = max;
    } else {
      this._maxValue = max;
    }

    this.updateValue();
  }

  @Input('clrStep')
  public set step(step: number) {
    this._step = step > 0 ? step : 1;
  }

  @Input('clrShowsLabels')
  public set showLabels(showsLabels: boolean) {
    this._showsLabels = showsLabels;
  }

  @Input('clrSliderSize')
  public set size(size: SliderSize) {
    this._size = size;
  }

  @Input('clrEnableValueFields')
  public set enableValueFields(enableValueFields: boolean) {
    this._enableValueFields = enableValueFields;
  }

  @Input('clrMultiValue')
  public set multiValue(multiValue: boolean) {
    this._multiValue = multiValue;
  }

  // ====== Tools ======
  private updateValue(): void {
    this.value = this._value;
  }
}
