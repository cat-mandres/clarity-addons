/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { SliderSize } from '../../../../clr-addons/slider/slider-size.enum';

@Component({
  selector: 'clr-slider-demo',
  styleUrls: ['./slider.demo.scss'],
  templateUrl: './slider.demo.html',
})
export class SliderDemo {
  private _sliderSize = SliderSize;
  private _showMultiValues = false;
}
