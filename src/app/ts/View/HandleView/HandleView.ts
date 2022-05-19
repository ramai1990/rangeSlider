import State from '../../Interfaces/State';
import BubbleView from '../BubbleView/BubbleView';
import RangeBubbleView from '../RangeBubbleView/RangeBubbleView';

class HandleView {
  private $slider: JQuery;

  private $track: JQuery;

  private $element!: JQuery;

  private bubbleView!: BubbleView | null;

  private rangeBubbleView!: RangeBubbleView | null;

  private type!: 'from' | 'to';

  constructor($slider: JQuery, state: State) {
    this.$slider = $slider;
    this.$track = this.$slider.find('.js-range-slider__track');
    this.init(state);
  }

  public update(state: State, position: number): void {
    this.move(position);
    this.updateDataset(state);

    const { showBubble, isRange } = state;

    if (showBubble) {
      this.bubbleView?.update(state);
      if (isRange && this.type === 'from') {
        this.rangeBubbleView?.update(state);
      }
    }
  }

  public getCurrentPosition(): number {
    const prop = this.isVertical() ? 'top' : 'left';

    return parseInt(this.$element.prop('style')[prop], 10);
  }

  public getCurrentValue(): number {
    return Number(this.$element.attr('data-value'));
  }

  private init(state: State): void {
    const { showBubble, isRange } = state;

    this.type = this.$track.find('.js-range-slider__handle').length === 0
      ? 'from'
      : 'to';

    this.handleElementInit(state);

    this.bubbleView = showBubble === true ? new BubbleView(this.$element, state) : null;

    const showRangeBubble = isRange && this.type === 'from';
    this.rangeBubbleView = showRangeBubble ? new RangeBubbleView(this.$element, state) : null;

    this.$track.append(this.$element);
  }

  protected handleElementInit(state: State): void {
    const { value, value2 } = state;
    const handleClasses = [
      'range-slider__handle',
      'js-range-slider__handle',
      `range-slider__handle_type_${this.type}`,
      `js-range-slider__handle_type_${this.type}`,
    ];
    const handleValue = this.type === 'from' ? value : value2;
    this.$element = $(`<a class='${handleClasses.join(' ')}' data-value=${handleValue} />`);
  }

  private move(position: number): void {
    const prop = this.isVertical() ? 'top' : 'left';
    this.$element.css({ [prop]: `${position}%` });
  }

  private updateDataset(state: State): void {
    const { value, value2 } = state;

    this.$element.attr('data-value', this.type === 'from' ? value : value2);
  }

  private isVertical(): boolean {
    return this.$slider.hasClass('js-range-slider_orientation_vertical');
  }
}

export default HandleView;
