import State from '../../Interfaces/State';

class BubbleView {
  protected $handle: JQuery;

  protected $element!: JQuery;

  protected type!: 'from' | 'to' | 'range';

  constructor($handle: JQuery, state: State) {
    this.$handle = $handle;

    this.init(state);
  }

  public update(state: Pick<State, 'value' | 'value2'>): void {
    const { value, value2 } = state;

    this.$element.text(this.type === 'from' ? <number>value : <number>value2);

    if (this.type !== 'range') {
      this.handleCollision();
    }
  }

  private handleCollision(): void {
    const oppositeType = this.type === 'from' ? 'to' : 'from';
    const $track = this.$handle.closest('.js-range-slider__track');
    const $oppositeBubble = $track.find(
      `.js-range-slider__bubble_type_${oppositeType}`,
    );

    if ($oppositeBubble.length === 0) {
      return;
    }

    const thisBubbleClientRect = this.$element[0].getBoundingClientRect();
    const oppositeBubbleClientRect = $oppositeBubble[0].getBoundingClientRect();

    const isOverlapping = thisBubbleClientRect.right > oppositeBubbleClientRect.left
      && thisBubbleClientRect.left < oppositeBubbleClientRect.right
      && thisBubbleClientRect.bottom > oppositeBubbleClientRect.top
      && thisBubbleClientRect.top < oppositeBubbleClientRect.bottom;

    const $rangeBubble = $track.find('.js-range-slider__bubble_type_range');

    if (isOverlapping) {
      this.$element.addClass('range-slider__bubble_hidden');
      $oppositeBubble.addClass('range-slider__bubble_hidden');
      $rangeBubble.removeClass('range-slider__bubble_hidden');
    } else {
      this.$element.removeClass('range-slider__bubble_hidden');
      $oppositeBubble.removeClass('range-slider__bubble_hidden');
      $rangeBubble.addClass('range-slider__bubble_hidden');
    }
  }

  protected init(state: State): void {
    this.type = this.$handle.hasClass('js-range-slider__handle_type_to')
      ? 'to'
      : 'from';
    const { value, value2 } = state;
    const bubbleValue = this.type === 'from' ? value : value2;
    const bubbleClasses = [
      'range-slider__bubble',
      'js-range-slider__bubble',
      `range-slider__bubble_type_${this.type}`,
      `js-range-slider__bubble_type_${this.type}`,
    ];
    this.$element = $(`<span class='${bubbleClasses.join(' ')}'>${bubbleValue}</span>`);
    this.$handle.append(this.$element);
  }
}

export default BubbleView;
