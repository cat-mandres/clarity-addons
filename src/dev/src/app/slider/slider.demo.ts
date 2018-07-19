/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClrSlider } from '@porscheinformatik/clr-addons';
import { SliderSize } from '../../../../clr-addons/slider/slidersize.enum';
import { Orientation } from '../../../../clr-addons/slider/orientation.enum';

@Component({
  selector: 'clr-slider-demo',
  styleUrls: ['./slider.demo.scss'],
  templateUrl: './slider.demo.html',
})
export class SliderDemo implements OnInit {
  ngOnInit(): void {
    this._sliderMisc1.onValueChanged.subscribe((num: Number) => {
      this._sliderMisc1NumberValue.nativeElement.value = num;
    });
  }

  private _sliderSize = SliderSize;
  private _sliderOrientation = Orientation;

  @ViewChild('horiSliderSize1') _horiSliderSize1: ClrSlider;
  @ViewChild('horiSliderSize2') _horiSliderSize2: ClrSlider;
  @ViewChild('horiSliderSize3') _horiSliderSize3: ClrSlider;
  @ViewChild('horiSliderSize4') _horiSliderSize4: ClrSlider;

  @ViewChild('vertSliderSize1') _vertSliderSize1: ClrSlider;
  @ViewChild('vertSliderSize2') _vertSliderSize2: ClrSlider;
  @ViewChild('vertSliderSize3') _vertSliderSize3: ClrSlider;
  @ViewChild('vertSliderSize4') _vertSliderSize4: ClrSlider;

  @ViewChild('sliderValueFields1') _sliderValueFields1: ClrSlider;

  @ViewChild('sliderShowsLabels1') _sliderShowsLabels1: ClrSlider;

  @ViewChild('sliderMisc1') _sliderMisc1: ClrSlider;
  @ViewChild('sliderMisc1NumberValue') _sliderMisc1NumberValue: ElementRef;
}
