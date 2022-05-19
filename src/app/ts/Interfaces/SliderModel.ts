import SliderViewExtraData from './SliderViewExtraData';
import State, { Events } from './State';

interface SliderModel {
  getState(): State;
  update(state: Events, extra?: SliderViewExtraData): this;
}

export default SliderModel;
