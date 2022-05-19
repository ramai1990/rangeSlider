/* eslint-disable @typescript-eslint/no-unused-vars */
import $ from 'jquery';
import State from '../../Interfaces/State';
import MainView from './MainView';
import {
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_STEP,
  DEFAULT_VALUE,
  DEFAULT_VALUE_2,
  DEFAULT_RANGE,
  DEFAULT_VERTICAL,
  DEFAULT_SHOW_BUBBLE,
  DEFAULT_GRID_DENSITY,
} from '../../const';

const defaultOptions: State = {
  min: DEFAULT_MIN,
  max: DEFAULT_MAX,
  step: DEFAULT_STEP,
  value: DEFAULT_VALUE,
  value2: DEFAULT_VALUE_2,
  isRange: DEFAULT_RANGE,
  isVertical: DEFAULT_VERTICAL,
  showBubble: DEFAULT_SHOW_BUBBLE,
  gridDensity: DEFAULT_GRID_DENSITY,
};

describe('View', () => {
  beforeEach(() => {
    $('<input/>').attr({ type: 'range' }).appendTo($('body'));
  });
  afterEach(() => {
    $('body').empty();
  });

  it('предоставляемые опции по умолчанию', () => {
    const view = new MainView($('input[type="range"]'), defaultOptions);

    const $slider = $('.js-range-slider');

    expect($slider.length).toEqual(1);
    expect($slider.find('.js-range-slider__handle').length).toEqual(1);
    expect(
      $slider.hasClass('js-range-slider_orientation_vertical'),
    ).toBeFalsy();
  });

  it('правильно представленный с вертикальным вариантом', () => {
    const options = { ...defaultOptions, isVertical: true };
    const view = new MainView($('input[type="range"]'), options);

    const $slider = $('.js-range-slider');

    expect(
      $slider.hasClass('js-range-slider_orientation_vertical'),
    ).toBeTruthy();
  });

  it('правильно представленный с диапазоном "range"', () => {
    const options = {
      ...defaultOptions,
      isRange: true,
    };
    const view = new MainView($('input[type="range"]'), options);

    const $slider = $('.js-range-slider');

    expect($slider.find('.js-range-slider__handle').length).toEqual(2);
    expect($slider.find('.js-range-slider__handle_type_from').length).toEqual(
      1,
    );
    expect($slider.find('.js-range-slider__handle_type_to').length).toEqual(1);
  });

  it('правильно представленный с опцией `showBubble`', () => {
    const value = 42;
    const options = {
      ...defaultOptions,
      value,
      showBubble: true,
    };
    const view = new MainView($('input[type="range"]'), options);
    const bubbleSelector = '.js-range-slider .js-range-slider__bubble';

    expect($(bubbleSelector).length).toEqual(1);
    expect($(bubbleSelector).text()).toEqual(value.toString());

    const updatedValue = 43;
    view.update(
      { ...options, value: updatedValue },
      { redraw: false, fromPosition: DEFAULT_MIN, toPosition: DEFAULT_MAX },
    );

    expect($(bubbleSelector).text()).toEqual(updatedValue.toString());

    view.update(
      { ...options, isRange: true },
      { redraw: true, fromPosition: DEFAULT_MIN, toPosition: DEFAULT_MAX },
    );

    expect($(bubbleSelector).length).toEqual(3);

    const rangeBubble = '.js-range-slider .js-range-slider__bubble_type_range';
    view.update(
      {
        ...options,
        isRange: true,
        value: 40,
        value2: 45,
      },
      {
        redraw: false,
        fromPosition: DEFAULT_MIN,
        toPosition: DEFAULT_MAX,
      },
    );
    expect($(rangeBubble).text()).toEqual('40-45');

    view.update(
      {
        ...options,
        isRange: true,
        value: 40,
        value2: 40,
      },
      {
        redraw: false,
        fromPosition: DEFAULT_MIN,
        toPosition: DEFAULT_MAX,
      },
    );
    expect($(rangeBubble).text()).toEqual('40');
  });

  it('правильно представленный с опцией `showGrid`', () => {
    const options = { ...defaultOptions, showGrid: true };

    const view = new MainView($('input[type="range"]'), options);

    expect($('.js-range-slider .js-range-slider__grid').length).toEqual(1);

    const gridDensity = 5;
    view.update(
      { ...options, gridDensity },
      { redraw: true, fromPosition: DEFAULT_MIN, toPosition: DEFAULT_MAX },
    );

    expect($('.js-range-slider .js-range-slider__grid-point').length).toEqual(
      gridDensity + 1,
    );
  });
});
