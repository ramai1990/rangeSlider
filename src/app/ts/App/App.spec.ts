/* eslint-disable @typescript-eslint/no-unused-vars */
import $ from 'jquery';
import App from './App';
import State from '../Interfaces/State';

import {
  DEFAULT_MIN,
  DEFAULT_MAX,
  DEFAULT_STEP,
  DEFAULT_VALUE,
  DEFAULT_VALUE_2,
  DEFAULT_GRID_DENSITY,
  DEFAULT_RANGE,
  DEFAULT_VERTICAL,
  DEFAULT_SHOW_BUBBLE,
  DEFAULT_SHOW_GRID,
  DEFAULT_SHOW_BAR,
} from '../const';

const defaultOptions: State = {
  min: DEFAULT_MIN,
  max: DEFAULT_MAX,
  step: DEFAULT_STEP,
  value: DEFAULT_VALUE,
  value2: DEFAULT_VALUE_2,
  gridDensity: DEFAULT_GRID_DENSITY,
  isRange: DEFAULT_RANGE,
  isVertical: DEFAULT_VERTICAL,
  showBubble: DEFAULT_SHOW_BUBBLE,
  showGrid: DEFAULT_SHOW_GRID,
  showBar: DEFAULT_SHOW_BAR,
};

interface Ticks {
  tickLabels: Array<number>;
  tickPositions: Array<string>;
}

const getTicks = (): Ticks => {
  const $ticks = $('.js-range-slider .js-range-slider__grid-point');

  const tickLabels: number[] = [];
  const tickPositions: string[] = [];
  $ticks.each((_, tick) => {
    const $tick = $(tick);
    const $label = $tick.find('.js-range-slider__grid-label');

    tickLabels.push(Number($label.text()));
    tickPositions.push($tick.css('top'));
  });

  return { tickLabels, tickPositions };
};

describe('App', () => {
  beforeEach(() => {
    $('<input/>').attr({ type: 'range' }).appendTo($('body'));
  });
  afterEach(() => {
    $('body').empty();
  });

  it('инициализированные с настройками по умолчанию', () => {
    const app: App = new App($('input[type="range"]'), defaultOptions);

    const $rangeSlider: JQuery = $('.js-range-slider');

    expect($rangeSlider.length).toEqual(1);
  });

  it('правильно обновляется', () => {
    const app: App = new App($('input[type="range"]'), defaultOptions);

    const handleSelector = '.js-range-slider .js-range-slider__handle';

    expect($(handleSelector).length).toEqual(1);

    app.update({ ...defaultOptions, isRange: true });

    expect($(handleSelector).length).toEqual(2);
  });

  it('правильно обрабатывает щелчок 1/2 дорожки', () => {
    const app: App = new App($('input[type="range"]'), defaultOptions);

    const $track = $('.js-range-slider .js-range-slider__track');

    const halfTrackClickX = ($track.outerWidth() as number) / 2
      + ($track.offset() as JQueryCoordinates).left;
    const halfTrackClickY = ($track.outerHeight() as number) / 2
      + ($track.offset() as JQueryCoordinates).top;

    const event = $.Event('mousedown');

    event.pageX = halfTrackClickX;
    event.pageY = halfTrackClickY;

    $track.trigger(event);

    const $handle = $('.js-range-slider .js-range-slider__handle');

    expect($handle.css('left')).toEqual('50%');
  });

  it('Правильно обрабатывает щелчок на 1/4 дорожки c двумя ручками', () => {
    const app: App = new App($('input[type="range"]'), defaultOptions);

    app.update({ isRange: true });

    const $track = $('.js-range-slider .js-range-slider__track');

    const quarterTrackClickX = ($track.outerWidth() as number) / 4
      + ($track.offset() as JQueryCoordinates).left;
    const halfTrackClickY = ($track.outerHeight() as number) / 2
      + ($track.offset() as JQueryCoordinates).top;

    const event = $.Event('mousedown');

    event.pageX = quarterTrackClickX;
    event.pageY = halfTrackClickY;

    $track.trigger(event);

    const $handleFrom = $(
      '.js-range-slider .js-range-slider__handle_type_from',
    );
    const $handleTo = $('.js-range-slider .js-range-slider__handle_type_to');

    expect($handleFrom.css('left')).toEqual('25%');
    expect($handleTo.css('left')).toEqual('100%');
  });

  it('Правильно обрабатывает щелчок на 3/4 дорожки c двумя ручками', () => {
    const app: App = new App($('input[type="range"]'), defaultOptions);

    app.update({ isRange: true });

    const $track = $('.js-range-slider .js-range-slider__track');

    const threeQuartersTrackClickX = (($track.outerWidth() as number) / 4) * 3
      + ($track.offset() as JQueryCoordinates).left;
    const halfTrackClickY = ($track.outerHeight() as number) / 2
      + ($track.offset() as JQueryCoordinates).top;

    const event = $.Event('mousedown');

    event.pageX = threeQuartersTrackClickX;
    event.pageY = halfTrackClickY;

    $track.trigger(event);

    const $handleFrom = $(
      '.js-range-slider .js-range-slider__handle_type_from',
    );
    const $handleTo = $('.js-range-slider .js-range-slider__handle_type_to');

    expect($handleFrom.css('left')).toEqual('0%');
    expect($handleTo.css('left')).toEqual('75%');
  });

  it('Правильно обрабатывает щелчок на 1/4 дорожки c двумя ручками', () => {
    const app: App = new App($('input[type="range"]'), { ...defaultOptions, isRange: true });

    // app.update({ isRange: true });s

    const $track = $('.js-range-slider .js-range-slider__track');

    const halfTrackClickX = ($track.outerWidth() as number) / 2
      + ($track.offset() as JQueryCoordinates).left;
    const halfTrackClickY = ($track.outerHeight() as number) / 2
      + ($track.offset() as JQueryCoordinates).top;

    const event = $.Event('mousedown');

    event.pageX = halfTrackClickX;
    event.pageY = halfTrackClickY;

    $track.trigger(event);

    const handleFrom = '.js-range-slider .js-range-slider__handle_type_from';
    const handleTo = '.js-range-slider .js-range-slider__handle_type_to';

    expect($(handleFrom).css('left')).toEqual('50%');
    expect($(handleTo).css('left')).toEqual('100%');

    $(handleFrom).trigger('mousedown');
    $(document).trigger('mousemove');
    $(document).trigger('mouseup');

    expect(
      $(handleFrom).hasClass('js-range-slider__handle_active'),
    ).toBeTruthy();

    event.pageX = (($track.outerWidth() as number) / 4) * 3
      + ($track.offset() as JQueryCoordinates).left;
    event.pageY = halfTrackClickY;

    $track.trigger(event);

    expect($(handleFrom).css('left')).toEqual('75%');
    expect($(handleTo).css('left')).toEqual('100%');
  });

  it('правильно обрабатывает клик по галочке', () => {
    const options = {
      ...defaultOptions,
      showGrid: true,
      gridDensity: 5,
      showBubble: true,
    };
    const app: App = new App($('input[type="range"]'), options);
    const $tickLabel = $('.js-range-slider').find(
      '.js-range-slider__grid-label:eq(2)',
    );
    const $bubble = $('.js-range-slider .js-range-slider__bubble');

    $tickLabel.trigger('click');
    expect($bubble.text()).toEqual('40');

    app.update({ ...options, isRange: true });

    const $tickLabelFirstQuarter = $('.js-range-slider').find(
      '.js-range-slider__grid-label:eq(1)',
    );
    $tickLabelFirstQuarter.trigger('click');
    expect(
      $('.js-range-slider .js-range-slider__bubble_type_from').text(),
    ).toEqual('20');

    const $tickLabelLastQuarter = $('.js-range-slider').find(
      '.js-range-slider__grid-label:eq(4)',
    );
    $tickLabelLastQuarter.trigger('click');
    expect(
      $('.js-range-slider .js-range-slider__bubble_type_to').text(),
    ).toEqual('80');
  });

  it('правильно отображает вертикальную сетку', () => {
    const options: State = {
      ...defaultOptions,
      showGrid: true,
      showBubble: true,
      isVertical: true,
      gridDensity: 5,
    };

    const app: App = new App($('input[type="range"]'), options);

    const { tickLabels, tickPositions } = getTicks();

    expect(tickLabels).toEqual([0, 20, 40, 60, 80, 100]);
    expect(tickPositions).toEqual(['0%', '20%', '40%', '60%', '80%', '100%']);
  });

  it('правильно визуализирует сетку с отрицательным minmax и шагом > 1', () => {
    const app: App = new App($('input[type="range"]'), defaultOptions);

    app.update({
      ...defaultOptions,
      min: -1,
      max: 11,
      step: 3,
      showGrid: true,
      showBubble: true,
      gridDensity: 10,
    });

    const { tickLabels } = getTicks();

    expect(tickLabels).toEqual([-1, 2, 5, 8, 11]);

    app.update({
      ...defaultOptions,
      min: -3,
      max: 11,
      step: 3,
      showGrid: true,
      showBubble: true,
      gridDensity: 10,
    });

    const { tickLabels: tickLabelsAfterUpdate } = getTicks();

    expect(tickLabelsAfterUpdate).toEqual([-3, 0, 3, 6, 9, 11]);

    const $tickLabel = $('.js-range-slider').find(
      '.js-range-slider__grid-label:last-child',
    );
    const $bubble = $('.js-range-slider .js-range-slider__bubble');

    $tickLabel.trigger('click');
    expect($bubble.text()).toEqual('11');
  });

  it('правильно отображается с опцией "showBar"', () => {
    const options: State = { ...defaultOptions, showBar: true, value: 50 };
    const app: App = new App($('input[type="range"]'), options);
    const barSelector = '.js-range-slider .js-range-slider__bar';

    expect($(barSelector).length).toEqual(1);
    expect($(barSelector).css('right')).toEqual('50%');

    app.update({
      ...options,
      isVertical: true,
    });

    expect($(barSelector).css('bottom')).toEqual('50%');

    app.update({
      ...options,
      isRange: true,
      value: 50,
      value2: 100,
    });
    expect($(barSelector).css('left')).toEqual('50%');
    expect($(barSelector).css('right')).toEqual('0%');
  });
});
