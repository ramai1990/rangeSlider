class BarView {
  private $slider: JQuery;

  private $track: JQuery;

  private $element!: JQuery;

  constructor($slider: JQuery) {
    this.$slider = $slider;
    this.$track = this.$slider.find('.js-range-slider__track');
    this.init();
  }

  public update(fromPosition: number, toPosition: number): void {
    const fromProp = this.isVertical() ? 'top' : 'left';
    const toProp = this.isVertical() ? 'bottom' : 'right';

    this.$element.css({ [fromProp]: `${fromPosition}%`, [toProp]: `${100 - toPosition}%` });
  }

  private init(): void {
    this.$element = $('<div class="range-slider__bar js-range-slider__bar" />');
    this.$track.append(this.$element);
  }

  private isVertical(): boolean {
    return this.$slider.hasClass('js-range-slider_orientation_vertical');
  }
}

export default BarView;
