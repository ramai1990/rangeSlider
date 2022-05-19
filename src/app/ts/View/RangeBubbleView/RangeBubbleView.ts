import State from '../../Interfaces/State';
import BubbleView from '../BubbleView/BubbleView';

class RangeBubbleView extends BubbleView {
  public update(state: State): void {
    const { value, value2 } = state;

    this.$element.text(
      value === value2 ? value : `${value}-${value2}`,
    );
  }

  protected init(state: State): void {
    this.rangeElementInit(state);
    this.$handle.append(this.$element);
  }

  protected rangeElementInit(state: State): void {
    const { value, value2 } = state;
    this.type = 'range';
    const rangeClasses = [
      'range-slider__bubble',
      'js-range-slider__bubble',
      'range-slider__bubble_type_range',
      'js-range-slider__bubble_type_range',
      'range-slider__bubble_hidden',
    ];
    const rangeValue = value === value2 ? value : `${value}-${value2}`;
    this.$element = $(`<span class='${rangeClasses.join(' ')}'>${rangeValue}</span>`);
  }
}

export default RangeBubbleView;
