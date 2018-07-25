/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClrSlider } from '@porscheinformatik/clr-addons';
import { SliderSize } from '../../../../clr-addons/slider/slider-size.enum';

@Component({
  selector: 'clr-slider-demo',
  styleUrls: ['./slider.demo.scss'],
  templateUrl: './slider.demo.html',
})
export class SliderDemo {
  private _sliderSize = SliderSize;

  private _showMultiValues = false;

  @ViewChild('horiSliderSize1') private _horiSliderSize1: ClrSlider;
  @ViewChild('horiSliderSize2') private _horiSliderSize2: ClrSlider;
  @ViewChild('horiSliderSize3') private _horiSliderSize3: ClrSlider;
  @ViewChild('horiSliderSize4') private _horiSliderSize4: ClrSlider;

  @ViewChild('sliderValueFields1') private _sliderValueFields1: ClrSlider;

  @ViewChild('sliderShowsLabels1') private _sliderShowsLabels1: ClrSlider;

  @ViewChild('sliderRangeSelection1') private _sliderRangeSelection1: ClrSlider;

  @ViewChild('sliderMisc1') private _sliderMisc1: ClrSlider;
  @ViewChild('sliderMisc1NumberValue') private _sliderMisc1NumberValue: ElementRef;
  @ViewChild('sliderMisc1LowValue') private _sliderMisc1NumberLowValue: ElementRef;
  @ViewChild('sliderMisc1HighValue') private _sliderMisc1NumberHighValue: ElementRef;
  @ViewChild('sliderMisc1MaxValue') private _sliderMisc1MaxValue: ElementRef;
  @ViewChild('sliderMisc1MinValue') private _sliderMisc1MinValue: ElementRef;
  @ViewChild('sliderMisc1StepValue') private _sliderMisc1StepValue: ElementRef;
  @ViewChild('sliderMisc1MultValue') private _sliderMisc1MultValue: ElementRef;
  @ViewChild('sliderMisc1LowValue') private _sliderMisc1LowValue: ElementRef;
  @ViewChild('sliderMisc1HighValue') private _sliderMisc1HighValue: ElementRef;
}
