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
    state:
      | keyof State
      | Pick<
          State,
          'min' | 'max' | 'step' | 'value' | 'value2' | 'gridDensity'
        >,
    extra?: SliderViewExtraData,
  ): void {
    const [type, payload] = Object.entries(state)[0];

    const event: ModelEvents = <ModelEvents>{
      type,
      payload,
    };

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
