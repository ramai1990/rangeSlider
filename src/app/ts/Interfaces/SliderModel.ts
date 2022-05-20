import SliderViewExtraData from './SliderViewExtraData';
import State, { ModelEvents } from './State';

interface SliderModel {
  getState(): State;
  update(state: ModelEvents, extra?: SliderViewExtraData): this;
}

export default SliderModel;
