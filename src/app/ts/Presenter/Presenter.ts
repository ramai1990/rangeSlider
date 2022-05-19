import SliderView from '../View/MainView/MainView';
import Model from '../Model/Model';
import State from '../Interfaces/State';
import SliderViewExtraData from '../Interfaces/SliderViewExtraData';
import SliderModelExtraData from '../Interfaces/SliderModelExtraData';

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
    state: number | State | undefined,
    extra?: SliderViewExtraData | SliderModelExtraData,
  ): void {
    const [type, value] = Object.entries(<State>state)[0];

    this.model.update({ type, value }, <SliderViewExtraData>extra);
  }

  private updateView(
    state: number | State | undefined,
    extra?: SliderModelExtraData,
  ): void {
    this.view.update(<State>state, <SliderModelExtraData>extra);
  }
}

export default Presenter;
