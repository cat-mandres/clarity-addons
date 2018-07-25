/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SliderSize } from './slider-size.enum';
import { SliderValueType } from './slider-value-type.enum';
import { ClrRange } from './range';

@Component({
  selector: 'clr-slider',
  templateUrl: './slider.html',
})
export class ClrSlider {
  @Output('clrValueChanged') onValueChanged: EventEmitter<any> = new EventEmitter(false);
  @ViewChild('rangeSliderComponent') private _rangeSliderComponent: ClrRange;

  @Input('clrShowsLabels') showLabels: boolean = true;
  @Input('clrEnableValueFields') enableValueFields: boolean = true;
  @Input('clrMultiValue') multiValue: boolean = false;
  @Input('clrSliderSize') size: SliderSize = SliderSize.medium;

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
    if (!this.enableValueFields) {
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
    if (!this.enableValueFields) {
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

  // ====== Tools ======
  private updateValue(): void {
    this.value = this._value;
  }
}
