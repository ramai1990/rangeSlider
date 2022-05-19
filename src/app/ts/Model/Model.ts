import Observer from '../Observer/Observer';
import {
  DEFAULT_STEP, GRID_DENSITY_MIN, GRID_DENSITY_MAX, DEFAULT_MIN, DEFAULT_MAX, DEFAULT_GRID_DENSITY,
} from '../const';

import State, { Events } from '../Interfaces/State';
import SliderViewExtraData from '../Interfaces/SliderViewExtraData';
import SliderModel from '../Interfaces/SliderModel';
import SliderModelExtraData from '../Interfaces/SliderModelExtraData';
import Key from '../types';

class Model extends Observer implements SliderModel {
  private state!: State;

  constructor(state: State) {
    super();
    this.init(state);
  }

  public get(key: Key): State[Key] {
    return this.state[key];
  }

  public getState(): State {
    return this.state;
  }

  public setState(state: State): void {
    this.init(state);
    const extra: SliderModelExtraData = { redraw: true };

    this.trigger(
      'change.state',
      { ...this.state },
      this.updateModelExtraPosition(extra),
    );
  }

  public update(
    { type, value }: Events,
    viewExtra: SliderViewExtraData = {},
  ): this {
    const thisState = { ...this.state };
    const modelExtra: SliderModelExtraData = { redraw: true };

    const { percent } = viewExtra;
    let newValue = value;

    switch (type) {
      case 'value':
      case 'value2':
        modelExtra.redraw = false;
        if (typeof percent !== 'undefined') {
          const { min, max } = thisState;
          newValue = Model.percentToValue(
            min,
            max,
            percent,
          );
        }
        thisState[type] = Model.validateValue(
          type,
          Number(newValue),
          thisState,
        );
        break;
      case 'min':
      case 'max':
      case 'step':
      case 'gridDensity':
        thisState[type] = Number(newValue);
        break;
      default:
        thisState[type] = newValue;
    }

    this.state = Model.validateState(thisState);

    this.trigger(
      'change.state',
      { ...this.state },
      this.updateModelExtraPosition(modelExtra),
    );

    if (typeof this.state.onChange === 'function') {
      this.state.onChange(this.state);
    }

    return this;
  }

  public emitChangeState(): void {
    const state: State = { ...this.state };
    const extra: SliderModelExtraData = { redraw: true };

    this.trigger('change.state', state, this.updateModelExtraPosition(extra));
  }

  public onChange(
    callback: (
      state: number | State | undefined,
      extra?: SliderModelExtraData
    ) => void,
  ): void {
    this.on('change.state', callback);
  }

  static percentToValue(min: number, max: number, percent: number): number {
    const range = Number(max) - Number(min);
    const value = Number(percent) * (range / 100) + Number(min);

    return Math.round(value);
  }

  static valueToPercent(min: number, max: number, value: number): number {
    const range = max - min;

    return Model.checkBoundaries(((value - min) * 100) / range);
  }

  private init(state: State): this {
    this.state = Model.validateState({ ...this.state, ...state });

    if (typeof this.state.onCreate === 'function') {
      this.state.onCreate(this.state);
    }

    return this;
  }

  private static validateState(state: State): State {
    const { min, max } = Model.validateMinMax(state);
    const step = Model.validateStep(state);
    const { value, value2 } = Model.validateValues({
      ...state,
      min,
      max,
      step,
    });
    const gridDensity = Model.validateGridDensity({
      ...state,
      min,
      max,
      step,
    });

    return {
      ...state,
      min,
      max,
      step,
      value,
      value2,
      gridDensity,
    };
  }

  private static validateGridDensity(state: State): number {
    const {
      gridDensity, min, max, step,
    } = state;

    const autoGridDensity = Math.round(
      (max - min) / step,
    );

    const validatedGridDensity = autoGridDensity < gridDensity
      ? autoGridDensity
      : gridDensity;

    if (validatedGridDensity < GRID_DENSITY_MIN) return GRID_DENSITY_MIN;
    if (validatedGridDensity > GRID_DENSITY_MAX) return GRID_DENSITY_MAX;

    return validatedGridDensity;
  }

  private static validateStep(state: State): number {
    const { step } = state;

    if (!Number.isInteger(step)) {
      return parseFloat(step.toFixed(1));
    }

    return Number(step) < DEFAULT_STEP ? DEFAULT_STEP : step;
  }

  private static validateMinMax(state: State): Pick<State, 'max' | 'min'> {
    let { min, max } = state;

    min = Number(min);
    max = Number(max);

    return {
      min: Math.round(min),
      max: Math.round(max),
    };
  }

  private static validateValues(state: State): State {
    const {
      value, value2, max, isRange,
    } = state;
    const isValueNull = isRange && value2 === null;
    return {
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      step: DEFAULT_STEP,
      gridDensity: DEFAULT_GRID_DENSITY,
      value: this.validateValue('value', <number>value, state),
      value2: isValueNull
        ? max
        : this.validateValue('value2', <number>value2, state),
    };
  }

  private static validateValue(
    prop: string,
    valueToValidate: number,
    state: State,
  ): number | null {
    const {
      min, max, value, value2, isRange, step,
    } = state;

    if (valueToValidate === null) return null;

    let outValue = Model.snapToStep(
      min,
      max,
      step,
      valueToValidate,
    );

    if (isRange) {
      const valueAlignedToStep = Model.snapToStep(
        min,
        max,
        step,
        <number>value,
      );
      const value2AlignedToStep = Model.snapToStep(
        min,
        max,
        step,
        <number>value2,
      );
      const validateStep = prop === 'value' && outValue > value2AlignedToStep;
      const validateStep2 = prop === 'value2' && outValue < valueAlignedToStep;
      if (validateStep) outValue = value2AlignedToStep;
      if (validateStep2) outValue = valueAlignedToStep;
    }

    outValue = outValue > max ? max : outValue;
    outValue = outValue < min ? min : outValue;

    return parseFloat(<string>outValue?.toFixed(1));
  }

  private static snapToStep(
    min: number,
    max: number,
    step: number,
    value: number,
  ): number {
    return value >= max ? max : Math.round((value - min) / step) * step + min;
  }

  private static checkBoundaries(position: number): number {
    const boundStart = 0;
    const boundEnd = 100;

    if (position > boundEnd) return boundEnd;
    if (position < boundStart) return boundStart;

    return position;
  }

  private updateModelExtraPosition(
    extra: SliderModelExtraData,
  ): SliderModelExtraData {
    const {
      min, max, value, value2,
    } = this.state;

    return {
      redraw: extra.redraw,
      fromPosition: Model.valueToPercent(
        min,
        max,
        <number>value,
      ),
      toPosition: Model.valueToPercent(
        min,
        max,
        <number>value2,
      ),
    };
  }
}

export default Model;
