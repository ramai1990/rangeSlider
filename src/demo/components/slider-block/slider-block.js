import RangeSlider from '../../../js/RangeSlider';

RangeSlider.init($);

class SliderBlock {
  constructor(root, config) {
    this._useJqueryPlugin(root, config);
  }

  _useJqueryPlugin(root, config) {
    const $sliderBlock = $(root);
    const $sliderWrapper = $sliderBlock.find('.js-slider-block__slider-wrapper');
    const $slider = $('<div>').appendTo($sliderWrapper);
    const $min = $sliderBlock.find('.js-slider-block__min');
    const $max = $sliderBlock.find('.js-slider-block__max');
    const $range = $sliderBlock.find('.js-slider-block__range');
    const $from = $sliderBlock.find('.js-slider-block__from');
    const $to = $sliderBlock.find('.js-slider-block__to');
    const $step = $sliderBlock.find('.js-slider-block__step');
    const $vertical = $sliderBlock.find('.js-slider-block__vertical');
    const $displayHint = $sliderBlock.find('.js-slider-block__tip');
    const $displayTracker = $sliderBlock.find('.js-slider-block__bar');
    const $displayGrid = $sliderBlock.find('.js-slider-block__scale');

    const rangeSlider = $slider.rangeSlider({
      ...config,
      onInit: (newConfig) => {
        const {
          min,
          max,
          range,
          from,
          to,
          step,
          vertical,
          displayHint,
          displayTracker,
          displayGrid,
        } = newConfig;

        $min.val(min).change(() => rangeSlider.update({ min: Number($min.val()) }));
        $max.val(max).change(() => rangeSlider.update({ max: Number($max.val()) }));
        $range.prop('checked', range).change(() => rangeSlider.update({ range: $range.is(':checked') }));
        $from.val(from).change(() => rangeSlider.update({ from: Number($from.val()) }));
        $to.val(to).change(() => rangeSlider.update({ to: Number($to.val()) }));
        $step.val(step).change(() => rangeSlider.update({ step: Number($step.val()) }));
        $vertical.prop('checked', vertical).change(() => rangeSlider.update({ vertical: $vertical.is(':checked') }));
        $displayHint.prop('checked', displayHint).change(() => rangeSlider.update({ displayHint: $displayHint.is(':checked') }));
        $displayTracker.prop('checked', displayTracker).change(() => rangeSlider.update({ displayTracker: $displayTracker.is(':checked') }));
        $displayGrid.prop('checked', displayGrid).change(() => rangeSlider.update({ displayGrid: $displayGrid.is(':checked') }));
      },
      onUpdate: (newConfig) => {
        const {
          min,
          max,
          range,
          from,
          to,
          step,
          vertical,
          displayHint,
          displayTracker,
          displayGrid,
        } = newConfig;

        $min.val(min);
        $max.val(max);
        $range.prop('checked', range);
        $from.val(from);
        $to.val(to);
        $step.val(step);
        $vertical.prop('checked', vertical);
        $displayHint.prop('checked', displayHint);
        $displayTracker.prop('checked', displayTracker);
        $displayGrid.prop('checked', displayGrid);
      },
      onChange: (newConfig) => {
        const { from, to } = newConfig;

        $from.val(from);
        $to.val(to);
      },
    }).data('range-slider');
  }
}

export default SliderBlock;
