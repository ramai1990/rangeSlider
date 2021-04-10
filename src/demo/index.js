import '../scss/main.scss'
import './index.pug'

import SliderBlock from './components/slider-block/slider-block';

const configs = [
  {},

  {
    range: true,
    displayHint: true,
    displayTracker: true,
  },

  {
    min: 0,
    max: 100,
    from: 1,
    displayHint: true,
    displayTracker: true,
  },
];

const $sliderBlocks = $('.js-slider-block');

$sliderBlocks.each(function createSliderBlock(id) {
  new SliderBlock(this, configs[id]);
});
