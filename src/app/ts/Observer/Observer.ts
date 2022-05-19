import Observable from '../Interfaces/Observable';
import State from '../Interfaces/State';
import SliderModelExtraData from '../Interfaces/SliderModelExtraData';
import SliderViewExtraData from '../Interfaces/SliderViewExtraData';

class Observer implements Observable {
  callbacks: Record<
    string,
    ((
      data: number | State,
      extra?: SliderViewExtraData | SliderModelExtraData
    ) => void)[]
  > = {};

  public on(events: string, fn: (data: number | State) => void): void {
    events.replace(/\S+/g, (name): string => {
      this.callbacks[name] = [];
      this.callbacks[name].push(fn);
      return '';
    });
  }

  public trigger(
    name: string,
    data: State | number,
    extra?: SliderModelExtraData | SliderViewExtraData,
  ): void {
    const fns = this.callbacks[name] || [];

    fns.map((fn) => fn.apply(this, [data, extra]));
  }
}

export default Observer;
