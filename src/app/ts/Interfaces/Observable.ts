import State from './State';
import SliderViewExtraData from './SliderViewExtraData';
import SliderModelExtraData from './SliderModelExtraData';

interface Observable {
  on(
    event: string,
    callback: (
      data: State | number | undefined,
      extra?: SliderViewExtraData | SliderModelExtraData
    ) => void
  ): void;
  trigger(
    event: string,
    data: State | number,
    extra?: SliderViewExtraData | SliderModelExtraData
  ): void;
}

export default Observable;
