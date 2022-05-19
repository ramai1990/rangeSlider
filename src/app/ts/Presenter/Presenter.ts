import SliderView from '../View/MainView/MainView';
import Model from '../Model/Model';
import State, { Events } from '../Interfaces/State';
import SliderViewExtraData from '../Interfaces/SliderViewExtraData';
import SliderModelExtraData from '../Interfaces/SliderModelExtraData';

class Presenter {
  private view: SliderView;

  private model: Model;

  constructor(view: SliderView, model: Model) {
    this.view = view;
    this.model = model;

    this.view.onChange((state, extra) => this.updateState(state, extra));
    this.model.onChange((state, extra) => (
      this.updateView(<State>state, <SliderModelExtraData>extra)
    ));

    this.model.emitChangeState();
  }

  public update(state: State): void {
    this.model.setState(state);
  }

  private updateState(
    state: number | State,
    extra?: SliderViewExtraData,
  ): void {
    const [type, payload] = Object.entries(state)[0];
    this.model.update(<Events>{ type, payload }, extra);
  }

  private updateView(state: State, extra: SliderModelExtraData): void {
    this.view.update(state, extra);
  }
}

export default Presenter;
