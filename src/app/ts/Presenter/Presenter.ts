import SliderView from '../View/MainView/MainView';
import Model from '../Model/Model';
import State, { ModelEvents } from '../Interfaces/State';
import SliderViewExtraData from '../Interfaces/SliderViewExtraData';
import SliderModelExtraData from '../Interfaces/SliderModelExtraData';
import {
  updateMin,
  updateMax,
  updateStep,
  updateValue,
  updateValue2,
  updateGridDensity,
} from '../actions';

interface PossibleEvent {
  type: string;
  payload: number;
}

class Presenter {
  private view: SliderView;

  private model: Model;

  constructor(view: SliderView, model: Model) {
    this.view = view;
    this.model = model;

    this.view.onChange((state, extra) => this.updateState(state, extra));
    this.model.onChange((state, extra) => this.updateView(state, extra));

    this.model.emitChangeState();
  }

  public update(state: State): void {
    this.model.setState(state);
  }

  private updateState(
    state: State | number,
    extra?: SliderViewExtraData,
  ): void {
    this.updateModel(state, extra);
  }

  private updateModel(
    state: State | number,
    extra: SliderViewExtraData | undefined,
  ): void {
    const [type, payload]: [string, number] = Object.entries(state)[0];

    const possibleEvent = {
      type,
      payload,
    };
    switch (possibleEvent.type) {
      case 'min': {
        this.updateEvent(possibleEvent, extra, updateMin);
        break;
      }
      case 'max': {
        this.updateEvent(possibleEvent, extra, updateMax);
        break;
      }
      case 'step': {
        this.updateEvent(possibleEvent, extra, updateStep);
        break;
      }
      case 'value': {
        this.updateEvent(possibleEvent, extra, updateValue);
        break;
      }
      case 'value2': {
        this.updateEvent(possibleEvent, extra, updateValue2);
        break;
      }
      case 'gridDensity': {
        this.updateEvent(possibleEvent, extra, updateGridDensity);
        break;
      }
      default:
        this.model.update(updateValue(payload), extra);
    }
  }

  private updateEvent(
    possibleEvent: PossibleEvent,
    extra: SliderViewExtraData | undefined,
    callback: (payload: number) => ModelEvents,
  ): void {
    const { payload } = possibleEvent;
    const event = Object.assign(possibleEvent, callback(payload));
    this.model.update(event, extra);
  }

  private updateView(
    state: State | number,
    extra: SliderModelExtraData | undefined,
  ): void {
    this.view.update(state, extra);
  }
}

export default Presenter;
