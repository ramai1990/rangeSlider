import State from '../../Interfaces/State';
import Observer from '../../Observer/Observer';
import Observable from '../../Interfaces/Observable';

interface Tick {
  position: string;
  value: number;
}

class GridView {
  private $slider: JQuery;

  private $element!: JQuery;

  private announcer: Observable;

  constructor($slider: JQuery, state: State) {
    this.announcer = new Observer();
    this.$slider = $slider;
    this.init(state);
  }

  public onClickTick(
    callback: (arg: number | State | undefined) => void,
  ): void {
    this.announcer.on('click.tick', callback);
  }

  private init(state: State): void {
    this.gridInit(state);
    this.$slider.append(this.$element);
    this.bindDocumentEvents();
  }

  protected gridInit(state: State): void {
    const { gridDensity } = state;
    const ticks = this.getTicks(state);
    const grid = $('<div class="range-slider__grid js-range-slider__grid" />');

    this.$element = grid.append(ticks.map(({ position, value }) => $(`<div class="range-slider__grid-point js-range-slider__grid-point" style=${position}>
          <span class="range-slider__grid-tick js-range-slider__grid-tick"></span>
          <span class="range-slider__grid-label js-range-slider__grid-label">
            ${value % 4 && gridDensity > 20 ? '' : parseFloat(value.toFixed(1))}
          </span>
        `)));
  }

  private bindDocumentEvents(): void {
    this.$element
      .find('.js-range-slider__grid-label')
      .on('click', this.handleTickClick);
  }

  private handleTickClick = (e: JQuery.ClickEvent): void => {
    const value = Number($(e.target).text());
    this.announcer.trigger('click.tick', value);
  };

  private getTicks(state: State): Tick[] {
    const {
      min, max, gridDensity, step,
    } = state;
    const ticks = [];
    const delta = Math.round(
      (max - min) / (gridDensity * step),
    );
    const cssProp = this.isVertical() ? 'top' : 'left';

    for (
      let currentValue = min;
      currentValue < max;
      currentValue += delta * step
    ) {
      const position = GridView.valueToPercent(min, max, currentValue);
      ticks.push({
        position: `${cssProp}:${position}%`,
        value: currentValue,
      });
    }

    ticks.push({
      position: `${cssProp}:100%`,
      value: max,
    });

    return ticks;
  }

  private isVertical(): boolean {
    return this.$slider.hasClass('range-slider_orientation_vertical');
  }

  private static valueToPercent(
    min: number,
    max: number,
    value: number,
  ): number {
    return ((value - min) * 100) / (max - min);
  }
}

export default GridView;
