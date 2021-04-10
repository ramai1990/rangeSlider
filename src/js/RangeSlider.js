import Model from './Model';
import Controller from './Controller';
import SliderView from './View/SliderView';
import HandleView from './View/HandleView';
import HintView from './View/HintView';
import TrackerView from './View/TrackerView';
import GridView from './View/GridView';

class RangeSlider {
  constructor(model) {
    this.handle = model.handle;
    this._model = model;
  }

  slide(handle, value) {
    this._model.startSlide(handle);
    this._model.slide(value);
    this._model.finishSlide();
  }

  update(config) {
    this._model.update(config);
  }

  reset() {
    this._model.reset();
  }

  toString() {
    return '{"class": "RangeSlider"}';
  }

  static init(jquery) {
    const $ = jquery;

    $.fn.rangeSlider = function rangeSlider(config) {
      return this.each(function createRangeSlider(controllerId) {
        if (!$(this).data('range-slider')) {
          const htmlConfig = $(this).data();
          const model = new Model(config, htmlConfig);

          const sliderView = new SliderView(this);
          const handleView = new HandleView(this);
          const hintView = new HintView(handleView);
          const trackerView = new TrackerView(this);
          const gridView = new GridView(this);

          new Controller(model, {
            sliderView,
            handleView,
            hintView,
            trackerView,
            gridView,
          }, controllerId);

          $(this).data('range-slider', new RangeSlider(model));
        }
      });
    };
  }
}

export default RangeSlider;
