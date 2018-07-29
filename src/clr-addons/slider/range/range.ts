/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SliderSize } from '../slider-size.enum';
import { SliderValueType } from '../slider-value-type.enum';

@Component({
  selector: 'clr-range',
  templateUrl: './range.html',
})
export class ClrRange implements OnInit {
  ngOnInit(): void {
    this.updateRangeBackground();
  }

  @ViewChild('valueInputElement1') _valueInputElement1: ElementRef;
  @ViewChild('valueInputElement2') _valueInputElement2: ElementRef;

  @Output('clrLowValueChanged') onLowValueChanged: EventEmitter<any> = new EventEmitter(false);
  @Output('clrHighValueChanged') onHighValueChanged: EventEmitter<any> = new EventEmitter(false);

  @Input('clrRangeSliderSize') private _rangeSliderSize: SliderSize;
  @Input('clrRangeSliderStep') private _rangeSliderStep: number;
  @Input('clrRangeSliderMinValue') private _rangeSliderMinValue: number = 0;
  @Input('clrRangeSliderMaxValue') private _rangeSliderMaxValue: number = 50;
  @Input('clrRangeSliderLowValue') private _lowValue: number = this._rangeSliderMinValue;
  @Input('clrRangeSliderHighValue') private _highValue: number = this._rangeSliderMaxValue;

  private _defaultArrangement: boolean = false;

  lowValueChanged(value): void {
    this.onLowValueChanged.emit(value);
    this._lowValue = value.value;
  }

  highValueChanged(value) {
    this.onHighValueChanged.emit(value);
    this._highValue = value.value;
  }

  OnMouseMoves(event) {
    if (!event.buttons) {
      const clickPoint = event.offsetX / this._valueInputElement1.nativeElement.offsetWidth;
      const clickValue = (this._rangeSliderMaxValue - this._rangeSliderMinValue) * clickPoint;

      const lowDiff = Math.abs(this.lowValue - clickValue);
      const highDiff = Math.abs(this.highValue - clickValue);

      this._defaultArrangement = this.isLowDiffCloserToMouseThanHighDiff(lowDiff, highDiff);
    }

    this.updateRangeBackground();
  }

  // ====== Getter ======
  public get lowValue(): number {
    return this.isInverted ? this._highValue : this._lowValue;
  }

  public get highValue(): number {
    return this.isInverted ? this._lowValue : this._highValue;
  }

  public get range(): number {
    return Math.abs(this._highValue - this._lowValue);
  }

  public get isInverted(): boolean {
    return +this._highValue < +this._lowValue;
  }

  public get lowPointForBackground(): string {
    return this.calculateLowPointForBackground();
  }

  public get highPointForBackground(): string {
    return this.calculateHighPointForBackground();
  }

  @Input('clrLowValue')
  public set lowValue(lowValue: number) {
    lowValue = Math.max(lowValue, this._rangeSliderMinValue);

    if (lowValue === this._lowValue || isNaN(lowValue)) {
      return;
    }

    this._lowValue = lowValue;
    this.updateValue();
    this.onLowValueChanged.emit({ valueType: SliderValueType.lowvalue, value: lowValue });
  }

  @Input('clrMultiValue')
  public set highValue(highValue: number) {
    highValue = Math.min(highValue, this._rangeSliderMaxValue);

    if (highValue === this._highValue || isNaN(highValue)) {
      return;
    }

    this._highValue = highValue;
    this.updateValue();
    this.onHighValueChanged.emit({ valueType: SliderValueType.highvalue, value: highValue });
  }

  // ====== Tools ======
  private updateValue(): void {
    this.lowValue = this._lowValue;
    this.highValue = this._highValue;
  }

  private isLowDiffCloserToMouseThanHighDiff(lowDiff: number, highDiff: number): boolean {
    if (this.isInverted) {
      return lowDiff < highDiff;
    }

    return !(lowDiff < highDiff);
  }

  private calculateLowPointForBackground(): string {
    return (
      100 * ((this.lowValue - this._rangeSliderMinValue) / (this._rangeSliderMaxValue - this._rangeSliderMinValue)) +
      1 +
      '%'
    );
  }

  private calculateHighPointForBackground(): string {
    return (
      100 * ((this.highValue - this._rangeSliderMinValue) / (this._rangeSliderMaxValue - this._rangeSliderMinValue)) -
      1 +
      '%'
    );
  }

  private updateRangeBackground(): void {
    this._valueInputElement1.nativeElement.style.setProperty('--low', this.lowPointForBackground);
    this._valueInputElement1.nativeElement.style.setProperty('--high', this.highPointForBackground);
    this._valueInputElement2.nativeElement.style.setProperty('--low', this.lowPointForBackground);
    this._valueInputElement2.nativeElement.style.setProperty('--high', this.highPointForBackground);
  }
}
