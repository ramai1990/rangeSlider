import '../scss/main.scss'
import './index.pug'

import SliderBlock from './components/slider-block/slider-block';

const configs = [
  {
    min: -50,
    max: 50,
    displayHint: true,
    displayGrid: true,
  },

  {
    range: true,
    displayHint: true,
    displayTracker: true,
    displayGrid: true,
  },

  {
    min: 0,
    max: 100,
    from: 1,
    displayHint: true,
    displayTracker: true,
    displayGrid: true,
  },

  {
    vertical: true,
    displayGrid: true
  },

  {displayGrid: true}
];

const $sliderBlocks = $('.js-slider-block');

$sliderBlocks.each(function createSliderBlock(id) {
  new SliderBlock(this, configs[id]);
});
