import Model from './Model';
import State, { ModelEvents } from '../Interfaces/State';

import {
  DEFAULT_MIN,
  DEFAULT_MAX,
  DEFAULT_STEP,
  DEFAULT_VALUE,
  DEFAULT_VALUE_2,
  DEFAULT_GRID_DENSITY,
  DEFAULT_RANGE,
  DEFAULT_VERTICAL,
  DEFAULT_SHOW_BUBBLE,
  DEFAULT_SHOW_GRID,
  DEFAULT_SHOW_BAR,
  GRID_DENSITY_MIN,
  GRID_DENSITY_MAX,
} from '../const';

const defaultOptions: State = {
  min: DEFAULT_MIN,
  max: DEFAULT_MAX,
  step: DEFAULT_STEP,
  value: DEFAULT_VALUE,
  value2: DEFAULT_VALUE_2,
  gridDensity: DEFAULT_GRID_DENSITY,
  isRange: DEFAULT_RANGE,
  isVertical: DEFAULT_VERTICAL,
  showBubble: DEFAULT_SHOW_BUBBLE,
  showGrid: DEFAULT_SHOW_GRID,
  showBar: DEFAULT_SHOW_BAR,
};

describe('Model', () => {
  it('имеет правильные значения при создании с опциями по умолчанию', () => {
    const model: Model = new Model(defaultOptions);
    const state: State = model.getState();

    expect(defaultOptions).toEqual(state);
    expect(defaultOptions.min).toEqual(state.min);
  });

  it('имеет правильные значения при создании с опциями не по умолчанию', () => {
    const max = Math.floor(Math.random() * 100);
    const options: State = { ...defaultOptions, max };
    const model: Model = new Model(options);
    const state: State = model.getState();

    expect(options).toEqual(state);
    expect(options.min).toEqual(state.min);
    expect(state.max).toEqual(max);
  });

  it('имеет правильные значения после установки случайного свойства', () => {
    const model = new Model(defaultOptions);
    const type = 'value';
    const value = Math.floor(Math.random() * 100);
    const state: ModelEvents = { type, payload: value };

    model.update(state);

    expect(model.get(type)).toEqual(value);
  });

  it('имеет правильное значение2 после установки `range` true', () => {
    const model = new Model({ ...defaultOptions, isRange: true });

    expect(model.get('value2')).toEqual(DEFAULT_MAX);
  });

  it('имеет правильные значения с заданным параметром `step`', () => {
    const options: State = { ...defaultOptions, step: 5, value: 23 };
    const model = new Model(options);

    expect(model.get('value')).toEqual(25);

    model.update({ type: 'value2', payload: 46 });

    expect(model.get('value2')).toEqual(45);

    model.update({ type: 'step', payload: 10 });

    expect(model.get('value')).toEqual(30);
    expect(model.get('value2')).toEqual(50);

    model.update({ type: 'step', payload: 1.297667 });

    expect(model.get('value')).toEqual(29.9);
    expect(model.get('value2')).toEqual(49.4);
  });

  it('переключать `значение` и `значение2`, если `значение` > `значение2`, когда оно есть.', () => {
    const options = {
      ...defaultOptions, isRange: true, value: 50, value2: 25,
    };
    const model = new Model(options);

    expect(model.get('value')).toEqual(25);
    expect(model.get('value2')).toEqual(50);
  });

  it('привязанное `значение` к `значению2`, если `значение` > `значение2` при обновлении одного `значения`.', () => {
    const options = {
      ...defaultOptions, isRange: true, value: 21, value2: 12,
    };
    const model = new Model(options);

    expect(model.get('value')).toEqual(12);
    expect(model.get('value2')).toEqual(21);

    model.update({ type: 'value', payload: 25 });

    expect(model.get('value')).toEqual(21);
  });

  it('привязанное `значение2` к `значению`, если `значение2` < значение` при обновлении одного `значения2`', () => {
    const options = {
      ...defaultOptions, isRange: true, value: 24, value2: 42,
    };
    const model = new Model(options);

    expect(model.get('value')).toEqual(24);
    expect(model.get('value2')).toEqual(42);

    model.update({ type: 'value2', payload: 20 });

    expect(model.get('value2')).toEqual(24);
  });

  it('не может содержать значений больше, чем `max`.', () => {
    const options = { ...defaultOptions, max: 1234, value: 12345 };
    const model = new Model(options);

    expect(model.get('value')).toEqual(1234);
    model.update({ type: 'value2', payload: 12345 });

    expect(model.get('value2')).toEqual(1234);
  });

  it('не может содержать значений меньше `min`.', () => {
    const options = { ...defaultOptions, min: -1234, value: -12345 };
    const model = new Model(options);

    expect(model.get('value')).toEqual(-1234);

    model.update({ type: 'value2', payload: -12345 });

    expect(model.get('value2')).toEqual(-1234);
  });

  it('преобразовывать проценты в правильные значения', () => {
    const options = { ...defaultOptions, min: 1000, max: 2000 };
    const model = new Model(options);

    model.update({ type: 'value', payload: null }, { percent: 50 });

    expect(model.get('value')).toEqual(1500);

    model.update({ type: 'value', payload: null }, { percent: 25 });
    model.update({ type: 'value2', payload: null }, { percent: 75 });

    expect(model.get('value')).toEqual(1250);
    expect(model.get('value2')).toEqual(1750);

    model.update({ type: 'value', payload: null }, { percent: 85 });

    expect(model.get('value2')).toEqual(1750);
  });

  it('конвертировать проценты в правильные значения с отрицательным minmax', () => {
    const options = { ...defaultOptions, min: -50, max: 50 };
    const model = new Model(options);

    model.update({ type: 'value', payload: null }, { percent: 50 });
    expect(model.get('value')).toEqual(0);

    model.update({ type: 'value', payload: null }, { percent: 0 });
    expect(model.get('value')).toEqual(-50);

    model.update({ type: 'value', payload: null }, { percent: 100 });
    expect(model.get('value')).toEqual(50);
  });

  it('корректно обрабатывать отрицательный minmax', () => {
    const min = -50;
    const max = 50;
    const options = { ...defaultOptions, min, max };
    const model: Model = new Model(options);

    expect(model.getState()).toEqual(options);

    model.update({ type: 'value', payload: -100 });
    expect(model.getState().value).toEqual(min);

    model.update({ type: 'value', payload: 100 });
    expect(model.getState().value).toEqual(max);
  });

  it('правильно конвертировать значение в процент', () => {
    expect(Model.valueToPercent(0, 1000, 500)).toEqual(50);
    expect(Model.valueToPercent(0, 1000, 1500)).toEqual(100);
    expect(Model.valueToPercent(0, 1000, -500)).toEqual(0);
  });

  it('вызов обратного вызова " onCreate` при инициализации', () => {
    let callbackAffectedNumber = 0;
    const callback = (state: State) => {
      callbackAffectedNumber += state.max;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const model: Model = new Model({ ...defaultOptions, onCreate: callback });

    expect(callbackAffectedNumber).toEqual(DEFAULT_MAX);
  });

  it('вызов обратного вызова " onChange` при обновлении', () => {
    let callbackAffectedNumber = 0;
    const value = 23;
    const callback = (state: State) => {
      if (state.value) {
        callbackAffectedNumber += state.value;
      }
    };
    const model: Model = new Model({ ...defaultOptions, onChange: callback });
    model.update({ type: 'value', payload: value });

    expect(callbackAffectedNumber).toEqual(value);
  });

  it('правильно обновить `gridDensity`', () => {
    const model: Model = new Model({ ...defaultOptions, showGrid: true });

    model.update({ type: 'gridDensity', payload: 20 });
    expect(model.getState().gridDensity).toEqual(20);

    model.update({ type: 'gridDensity', payload: -10 });
    expect(model.getState().gridDensity).toEqual(GRID_DENSITY_MIN);

    model.update({ type: 'gridDensity', payload: 200 });
    expect(model.getState().gridDensity).toEqual(GRID_DENSITY_MAX);
  });

  it('правильно обновить `step`', () => {
    const model: Model = new Model(defaultOptions);

    model.update({ type: 'step', payload: 20 });
    expect(model.getState().step).toEqual(20);

    model.update({ type: 'step', payload: 0 });
    expect(model.getState().step).toEqual(DEFAULT_STEP);
  });

  it('правильно подтвердить состояние, когда `range` и `значение` > `max`', () => {
    const model: Model = new Model({ ...defaultOptions, isRange: true, value: 999 });

    expect(model.getState().value).toEqual(0);
    expect(model.getState().value2).toEqual(100);

    model.update({ type: 'value', payload: 999 });

    expect(model.getState().value).toEqual(100);
    expect(model.getState().value2).toEqual(100);
  });
});
