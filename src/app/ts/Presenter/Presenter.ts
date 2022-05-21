import SliderView from '../View/MainView/MainView';
import Model from '../Model/Model';
import State, { ModelEvents } from '../Interfaces/State';
import SliderViewExtraData from '../Interfaces/SliderViewExtraData';
import SliderModelExtraData from '../Interfaces/SliderModelExtraData';

class Presenter {
  private view: SliderView;

  private model: Model;

  constructor(view: SliderView, model: Model) {
    this.view = view;
    this.model = model;

    this.view.onChange((state, extra) => (typeof state !== 'number' ? this.updateState(state, extra) : state));
    this.model.onChange((state, extra) => this.updateView(state, extra));

    this.model.emitChangeState();
  }

  public update(state: State): void {
    this.model.setState(state);
  }

  private updateState(
    state: Pick<
      State,
      'min' | 'max' | 'step' | 'value' | 'value2' | 'gridDensity'
    >,
    extra?: SliderViewExtraData,
  ): void {
    const [type, payload] = Object.entries(state)[0];

    const possibleEvent = {
      type,
      payload,
    };

    const value: ModelEvents = {
      type: 'value',
      payload,
    };
    const value2: ModelEvents = {
      type: 'value2',
      payload,
    };
    const min: ModelEvents = {
      type: 'min',
      payload,
    };
    const max: ModelEvents = {
      type: 'max',
      payload,
    };
    const step: ModelEvents = {
      type: 'step',
      payload,
    };
    const gridDensity: ModelEvents = {
      type: 'gridDensity',
      payload,
    };

    switch (possibleEvent.type) {
      case 'min': {
        const event = Object.assign(possibleEvent, min);
        this.model.update(event, extra);
        break;
      }
      case 'max': {
        const event = Object.assign(possibleEvent, max);
        this.model.update(event, extra);
        break;
      }
      case 'step': {
        const event = Object.assign(possibleEvent, step);
        this.model.update(event, extra);
        break;
      }
      case 'value': {
        const event = Object.assign(possibleEvent, value);
        this.model.update(event, extra);
        break;
      }
      case 'value2': {
        const event = Object.assign(possibleEvent, value2);
        this.model.update(event, extra);
        break;
      }
      case 'gridDensity': {
        const event = Object.assign(possibleEvent, gridDensity);
        this.model.update(event, extra);
        break;
      }
      default:
        this.model.update(value, extra);
    }
  }

  private updateView(
    state: State | number,
    extra: SliderModelExtraData | undefined,
  ): void {
    this.view.update(state, extra);
  }
}

export default Presenter;
