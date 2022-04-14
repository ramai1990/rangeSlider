import Observer from '../../Observer/Observer';

import State from '../../Interfaces/State';
import SliderView from '../../Interfaces/SliderView';
import LayerObservable from '../../Interfaces/LayerObservable';
import Observable from '../../Interfaces/Observable';
import SliderViewExtraData from '../../Interfaces/SliderViewExtraData';
import SliderModelExtraData from '../../Interfaces/SliderModelExtraData';
import HandleView from '../HandleView/HandleView';
import BarView from '../BarView/BarView';
import GridView from '../GridView/GridView';

class MainView implements SliderView, LayerObservable {
  announcer: Observable;

  private $target: JQuery;

  private $element!: JQuery;

  private $track!: JQuery;

  private $handleFrom!: JQuery;

  private $handleTo!: JQuery;

  private $draggingHandle!: JQuery | null;

  private handleFromView!: HandleView;

  private handleToView!: HandleView | null;

  private barView!: BarView | null;

  private gridView!: GridView | null;

  private handleCenterOffset = 0;

  private handleDragStart = (e: JQuery.Event): void => this.announceJump(e);

  private handleDrag = (e: JQuery.Event): void => this.announceDrag(e);

  private handleDragEnd = (e: JQuery.Event): void => this.dragEnd(e);

  constructor($target: JQuery, state: State) {
    this.announcer = new Observer();
    this.$target = $target;
    this.init(state);
  }

  public update(state: State, extra: SliderModelExtraData): this {
    const { redraw, fromPosition, toPosition } = extra;

    if (redraw === true) {
      this.init(state);
    }

    this.handleFromView.update(state, <number>fromPosition);
    if (this.handleToView) {
      this.handleToView.update(state, <number>toPosition);
    }

    if (this.barView) {
      this.barView.update(
        this.handleToView ? <number>fromPosition : 0,
        this.handleToView ? <number>toPosition : <number>fromPosition,
      );
    }

    return this;
  }

  public onChange(
    callback: (
      state: State | number | undefined,
      extra?: SliderViewExtraData | SliderModelExtraData
    ) => void,
  ): void {
    this.announcer.on('change.view', callback);
  }

  private init(state: State): void {
    if (this.$element) {
      this.$element.remove();
    }

    this.rangeSliderInit(state);

    this.$target.after(this.$element).hide();

    this.handleFromView = new HandleView(this.$element, state);

    const { isRange, showGrid, showBar } = state;

    this.handleToView = isRange === true ? new HandleView(this.$element, state) : null;
    this.barView = showBar === true ? new BarView(this.$element) : null;

    if (showGrid) {
      this.gridView = new GridView(this.$element, state);
      this.gridView.onClickTick((value) => this.announceClickTick(<number>value));
    } else {
      this.gridView = null;
    }

    this.$track = this.$element.find('.js-range-slider__track');
    this.$handleFrom = this.$element.find('.js-range-slider__handle_type_from');
    this.$handleTo = this.$element.find('.js-range-slider__handle_type_to');

    this.bindDocumentEvents();
  }

  protected rangeSliderInit(state: State): void {
    const { isVertical } = state;

    const rangeSlider = $('<div class="range-slider js-range-slider">');
    if (isVertical) {
      rangeSlider
        .addClass('range-slider_orientation_vertical js-range-slider_orientation_vertical');
    }
    this.$element = rangeSlider
      .append($('<div class="range-slider__track js-range-slider__track">'));
  }

  private announceJump(e: MouseEvent | JQuery.Event): void {
    this.setHandleCenterOffset(e as MouseEvent);
    const cursorPosition = this.getCursorPosition(e as MouseEvent);

    let statePropName = 'value';

    if (this.handleToView) {
      statePropName = MainView.getClosestValuePropName(
        cursorPosition,
        this.handleFromView.getCurrentPosition(),
        this.handleToView.getCurrentPosition(),
      );
    }

    this.$draggingHandle = statePropName === 'value' ? this.$handleFrom : this.$handleTo;

    this.$handleFrom.removeClass(
      'range-slider__handle_active js-range-slider__handle_active',
    );
    this.$handleTo.removeClass(
      'range-slider__handle_active js-range-slider__handle_active',
    );
    this.$draggingHandle.addClass(
      'range-slider__handle_active js-range-slider__handle_active',
    );

    const state: Omit<State, 'value' | 'value2'> | number = {
      [statePropName]: null,
    };

    const extra: SliderViewExtraData = { percent: cursorPosition };

    this.announcer.trigger('change.view', state as State, extra);
  }

  private announceDrag(
    e: JQuery.Event | (MouseEvent & JQuery.ClickEvent),
  ): void {
    e.preventDefault();
    if (this.$draggingHandle) {
      const statePropName = this.$draggingHandle.hasClass(
        'js-range-slider__handle_type_to',
      )
        ? 'value2'
        : 'value';

      const state: Omit<State, 'value' | 'value2'> | number = {
        [statePropName]: null,
      };
      const extra: SliderViewExtraData = {
        percent: this.getCursorPosition(e as MouseEvent),
      };

      this.announcer.trigger('change.view', state as State, extra);
    }
  }

  private announceClickTick(value: number): void {
    const statePropName = this.handleToView
      ? MainView.getClosestValuePropName(
        value,
        this.handleFromView.getCurrentValue(),
        this.handleToView.getCurrentValue(),
      )
      : 'value';
    const state: Partial<State> = { [statePropName]: value };
    this.announcer.trigger('change.view', state as State);
  }

  private dragEnd(e: JQuery.Event | MouseEvent): void {
    e.preventDefault();
    if (this.$draggingHandle) {
      this.$draggingHandle = null;
      this.handleCenterOffset = 0;
    }
  }

  private getCursorPosition(e: MouseEvent): number {
    const $track = this.$element.find('.range-slider__track');

    const cursorPositionPx = this.isVertical() ? e.pageY : e.pageX;
    const trackOffsetPx = this.isVertical()
      ? ($track.offset() as JQueryCoordinates).top
      : ($track.offset() as JQueryCoordinates).left;
    const percentUnitPx = this.isVertical()
      ? ($track.outerHeight() as number) / 100
      : ($track.outerWidth() as number) / 100;

    return (
      (<number>cursorPositionPx - trackOffsetPx + this.handleCenterOffset)
      / percentUnitPx
    );
  }

  private setHandleCenterOffset(e: MouseEvent): void {
    const $handle = $(e.target as EventTarget).closest(
      '.js-range-slider__handle',
    );
    if ($handle.length === 1) {
      const cursorPositionPx = this.isVertical() ? e.pageY : e.pageX;
      const handleOffsetPx = this.isVertical()
        ? ($handle.offset() as JQueryCoordinates).top
        : ($handle.offset() as JQueryCoordinates).left;
      const handleDimensionPx = this.isVertical()
        ? $handle.outerHeight()
        : $handle.outerWidth();

      this.handleCenterOffset = handleOffsetPx
        - <number>cursorPositionPx
        + <number>handleDimensionPx / 2;
    }
  }

  private isVertical(): boolean {
    return this.$element.hasClass('js-range-slider_orientation_vertical');
  }

  private bindDocumentEvents(): void {
    this.$track.on('mousedown', this.handleDragStart);

    $(document)
      .off('mouseup', this.handleDragEnd)
      .on('mouseup', this.handleDragEnd)
      .off('mousemove', this.handleDrag)
      .on('mousemove', this.handleDrag);
  }

  private static getClosestValuePropName(
    target: number,
    from: number,
    to: number,
  ): string {
    const distFrom = Math.abs(target - from);
    const distTo = Math.abs(target - to);
    const isEqual = distFrom === distTo && from === to;

    if (isEqual && target > from) {
      return 'value2';
    }

    return distFrom > distTo ? 'value2' : 'value';
  }
}

export default MainView;
