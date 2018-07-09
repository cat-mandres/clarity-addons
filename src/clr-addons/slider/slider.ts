/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Orientation} from "./orientation.enum";
import {SliderSize} from "./slidersize.enum";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'clr-slider',
  templateUrl: './slider.html',
})

export class ClrSlider{
  // ======================
  // ====== Children ======
  // ======================
  @ViewChild('slider')slider: ElementRef;
  @Output('clrValueChanged') onValueChanged: EventEmitter<any> = new EventEmitter(false);

  // ====================
  // ====== Events ======
  // ====================
  valueChanged(value:number): void{
    this.onValueChanged.emit(value);
    this.value = value;
  }

  onMinValueChange(newMinValue: number):void{
    this.minValue = newMinValue;
  }

  onMaxValueChange(newMaxValue: number):void{
    this.maxValue = newMaxValue;
  }

  // ====================
  // == Private Fields ==
  // ====================
  private _value = 0;
  private _minValue = 0;
  private _maxValue = 50;
  private _step = 1;
  private _showsLabels = true;
  private _orientation: Orientation = Orientation.vertical;
  private _size = SliderSize.MEDIUM;
  private _enableValueFields = true;

  // ====================
  // ====== Getter ======
  // ====================
  public get value():number
  {
    return this._value;
  }

  public get minValue():number{
    return this._minValue;
  }

  public get maxValue():number{
    return this._maxValue;
  }

  public get step():number{
    return this._step;
  }

  public get showsLabels():boolean{
    return this._showsLabels;
  }

  public get orientation():Orientation {
    return this._orientation;
  }

  public get sliderSize():SliderSize{
    return this._size;
  }

  public get valueFieldsAreEnabled():boolean{
    return this._enableValueFields;
  }

  // ====================
  // ====== Setter ======
  // ====================
  @Input('clrValue')
  public set value(value: number) {
    const newvalue = Math.min(Math.max(value, this._minValue), this._maxValue);

    if(newvalue === this._value){
      return;
    }

    this._value = newvalue;
    this.onValueChanged.emit(value);
  }

  @Input('clrMinValue')
  public set minValue(min: number) {
    if(min>this._maxValue){
      this._minValue = this._maxValue;
      this._maxValue = min;
    }
    else {
      this._minValue = min;
    }

    this.updateValue();
  }

  @Input('clrMaxValue')
  public set maxValue(max:number){
    if(max<this._minValue){
      this._maxValue = this._minValue;
      this._minValue = max;
    }
    else {
      this._maxValue = max;
    }

    this.updateValue();
  }

  @Input('clrStep')
  public set step(step:number){
    this._step = step>0?this._step:step;
  }

  @Input('clrShowsLabels')
  public set showLabels(showsLabels:boolean){
    this._showsLabels = showsLabels;
  }

  @Input('clrOrientation')
  public set orientation(orientation:Orientation){
    this._orientation = orientation;
  }

  @Input('clrSliderSize')
  public set size(size:SliderSize){
    this._size = size;
  }

  @Input('clreEableValueFields')
  public set enableValueFields(enableValueFields:boolean){
    this._enableValueFields = enableValueFields;
  }

  // ===================
  // ====== Tools ======
  // ===================
  private updateValue():void{
    this.value = this._value;
  }
}
