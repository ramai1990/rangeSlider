import Model from '../../js/Model/Model';

describe('Model', () => {
  const defaultConfig = {
    min: 0,
    max: 50,
    range: false,
    from: 0,
    to: 10,
    step: 1,
    vertical: false,
    displayHint: false,
    displayTracker: false,
    displayGrid: false,
    gridStep: 10,
    disabled: false,
    onInit: null,
    onStart: null,
    onSlide: null,
    onChange: null,
    onFinish: null,
    onUpdate: null,
  };

  const customConfig = {
    min: 100,
    max: 1000,
    range: true,
    from: 150,
    to: 200,
    step: 2,
    vertical: true,
    displayHint: true,
    displayTracker: true,
    displayGrid: true,
    gridStep: 2,
    disabled: true,
    onInit() {},
    onStart() {},
    onSlide() {},
    onChange() {},
    onFinish() {},
    onUpdate() {},
  };

  describe('constructor', () => {
    it('должен реализовать настройки по умолчанию', () => {
      const model = new Model();
      expect(model.getConfig()).toEqual(defaultConfig);
    });

    it('должен один раз вызвать метод validate с настройками по умолчанию', () => {
      const validate = spyOn(Model.prototype, 'validate').and.callFake(() => ({}));
      new Model();
      expect(validate).toHaveBeenCalledTimes(1);
      expect(validate).toHaveBeenCalledWith(defaultConfig);
    });

    it('должен один раз вызвать метод validate с пользовательскими настройками', () => {
      const validate = spyOn(Model.prototype, 'validate').and.callFake(() => ({}));
      new Model(customConfig);
      expect(validate).toHaveBeenCalledTimes(1);
      expect(validate).toHaveBeenCalledWith(customConfig);
    });

    it('должен один раз вызвать метод onInit, передав в качестве аргумента конфигурацию модели', () => {
      const fakeConfig = { onInit() {} };
      const onInit = spyOn(fakeConfig, 'onInit');
      const model = new Model(fakeConfig);
      expect(onInit).toHaveBeenCalledTimes(1);
      expect(onInit).toHaveBeenCalledWith(model.getConfig());
    });
  });

  describe('validate', () => {
    const model = new Model();

    it('должен выбросить исключение при неверном типе данных свойства min', () => {
      expect(() => { model.validate({ min: NaN }); }).toThrow();
      expect(() => { model.validate({ min: '0' }); }).toThrow();
      expect(() => { model.validate({ min: false }); }).toThrow();
      expect(() => { model.validate({ min: {} }); }).toThrow();
      expect(() => { model.validate({ min: null }); }).toThrow();
      expect(() => { model.validate({ min() {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства max', () => {
      expect(() => { model.validate({ max: NaN }); }).toThrow();
      expect(() => { model.validate({ max: '0' }); }).toThrow();
      expect(() => { model.validate({ max: false }); }).toThrow();
      expect(() => { model.validate({ max: {} }); }).toThrow();
      expect(() => { model.validate({ max: null }); }).toThrow();
      expect(() => { model.validate({ max() {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства range', () => {
      expect(() => { model.validate({ range: '0' }); }).toThrow();
      expect(() => { model.validate({ range: 0 }); }).toThrow();
      expect(() => { model.validate({ range: {} }); }).toThrow();
      expect(() => { model.validate({ range: null }); }).toThrow();
      expect(() => { model.validate({ range() {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства from', () => {
      expect(() => { model.validate({ from: NaN }); }).toThrow();
      expect(() => { model.validate({ from: '0' }); }).toThrow();
      expect(() => { model.validate({ from: false }); }).toThrow();
      expect(() => { model.validate({ from: {} }); }).toThrow();
      expect(() => { model.validate({ from: null }); }).toThrow();
      expect(() => { model.validate({ from() {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства to', () => {
      expect(() => { model.validate({ to: NaN }); }).toThrow();
      expect(() => { model.validate({ to: '0' }); }).toThrow();
      expect(() => { model.validate({ to: false }); }).toThrow();
      expect(() => { model.validate({ to: {} }); }).toThrow();
      expect(() => { model.validate({ to: null }); }).toThrow();
      expect(() => { model.validate({ to() {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства step', () => {
      expect(() => { model.validate({ step: NaN }); }).toThrow();
      expect(() => { model.validate({ step: '0' }); }).toThrow();
      expect(() => { model.validate({ step: false }); }).toThrow();
      expect(() => { model.validate({ step: {} }); }).toThrow();
      expect(() => { model.validate({ step: null }); }).toThrow();
      expect(() => { model.validate({ step() {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства vertical', () => {
      expect(() => { model.validate({ vertical: '0' }); }).toThrow();
      expect(() => { model.validate({ vertical: 0 }); }).toThrow();
      expect(() => { model.validate({ vertical: {} }); }).toThrow();
      expect(() => { model.validate({ vertical: null }); }).toThrow();
      expect(() => { model.validate({ vertical() {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства displayHint', () => {
      expect(() => { model.validate({ displayHint: '0' }); }).toThrow();
      expect(() => { model.validate({ displayHint: 0 }); }).toThrow();
      expect(() => { model.validate({ displayHint: {} }); }).toThrow();
      expect(() => { model.validate({ displayHint: null }); }).toThrow();
      expect(() => { model.validate({ displayHint() {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства displayTracker', () => {
      expect(() => { model.validate({ displayTracker: '0' }); }).toThrow();
      expect(() => { model.validate({ displayTracker: 0 }); }).toThrow();
      expect(() => { model.validate({ displayTracker: {} }); }).toThrow();
      expect(() => { model.validate({ displayTracker: null }); }).toThrow();
      expect(() => { model.validate({ displayTracker() {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства displayGrid', () => {
      expect(() => { model.validate({ displayGrid: '0' }); }).toThrow();
      expect(() => { model.validate({ displayGrid: 0 }); }).toThrow();
      expect(() => { model.validate({ displayGrid: {} }); }).toThrow();
      expect(() => { model.validate({ displayGrid: null }); }).toThrow();
      expect(() => { model.validate({ displayGrid() {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства gridStep', () => {
      expect(() => { model.validate({ to: NaN }); }).toThrow();
      expect(() => { model.validate({ to: '0' }); }).toThrow();
      expect(() => { model.validate({ to: false }); }).toThrow();
      expect(() => { model.validate({ to: {} }); }).toThrow();
      expect(() => { model.validate({ to: null }); }).toThrow();
      expect(() => { model.validate({ to() {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства disabled', () => {
      expect(() => { model.validate({ disabled: '0' }); }).toThrow();
      expect(() => { model.validate({ disabled: 0 }); }).toThrow();
      expect(() => { model.validate({ disabled: {} }); }).toThrow();
      expect(() => { model.validate({ disabled: null }); }).toThrow();
      expect(() => { model.validate({ disabled() {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства onInit', () => {
      expect(() => { model.validate({ onInit: false }); }).toThrow();
      expect(() => { model.validate({ onInit: 'null' }); }).toThrow();
      expect(() => { model.validate({ onInit: 0 }); }).toThrow();
      expect(() => { model.validate({ onInit: {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства onStart', () => {
      expect(() => { model.validate({ onStart: false }); }).toThrow();
      expect(() => { model.validate({ onStart: '0' }); }).toThrow();
      expect(() => { model.validate({ onStart: 0 }); }).toThrow();
      expect(() => { model.validate({ onStart: {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства onSlide', () => {
      expect(() => { model.validate({ onSlide: false }); }).toThrow();
      expect(() => { model.validate({ onSlide: '0' }); }).toThrow();
      expect(() => { model.validate({ onSlide: 0 }); }).toThrow();
      expect(() => { model.validate({ onSlide: {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства onChange', () => {
      expect(() => { model.validate({ onChange: false }); }).toThrow();
      expect(() => { model.validate({ onChange: '0' }); }).toThrow();
      expect(() => { model.validate({ onChange: 0 }); }).toThrow();
      expect(() => { model.validate({ onChange: {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства onFinish', () => {
      expect(() => { model.validate({ onFinish: false }); }).toThrow();
      expect(() => { model.validate({ onFinish: '0' }); }).toThrow();
      expect(() => { model.validate({ onFinish: 0 }); }).toThrow();
      expect(() => { model.validate({ onFinish: {} }); }).toThrow();
    });

    it('должен выбросить исключение при неверном типе данных свойства onUpdate', () => {
      expect(() => { model.validate({ onUpdate: false }); }).toThrow();
      expect(() => { model.validate({ onUpdate: '0' }); }).toThrow();
      expect(() => { model.validate({ onUpdate: 0 }); }).toThrow();
      expect(() => { model.validate({ onUpdate: {} }); }).toThrow();
    });

    it('должен округлить свойство min до 4 знаков после запятой', () => {
      const config = model.validate({ min: 0.12339, max: 100, step: 0.0617 });
      expect(config.min).toEqual(0.1234);
    });

    it('должен округлить свойство max до 4 знаков после запятой', () => {
      const config = model.validate({ min: 0, max: 0.12339, step: 0.0617 });
      expect(config.max).toEqual(0.1234);
    });

    it('должен округлить свойство from до 4 знаков после запятой', () => {
      const config = model.validate({
        min: 0,
        max: 100,
        from: 0.12339,
        to: 10,
        step: 0.0617,
      });
      expect(config.from).toEqual(0.1234);
    });

    it('должен округлить свойство to до 4 знаков после запятой', () => {
      const config = model.validate({
        min: 0,
        max: 100,
        from: 0,
        to: 0.12339,
        step: 0.0617,
      });
      expect(config.to).toEqual(0.1234);
    });

    it('должен округлить свойство step до 4 знаков после запятой', () => {
      const config = model.validate({ step: 0.12339 });
      expect(config.step).toEqual(0.1234);
    });

    it('должен приравнять свойство min к max', () => {
      const config = model.validate({ min: 1, max: 0 });
      expect(config.min).toEqual(config.max);
    });

    it('должен приравнять свойство from к to', () => {
      const config = model.validate({ range: true, from: 1, to: 0 });
      expect(config.from).toEqual(config.to);
    });

    it('должен выравнять from и to между min и max', () => {
      const config1 = model.validate({
        min: 0,
        max: 10,
        from: -5,
        to: -1,
      });
      expect(config1.from).toEqual(config1.min);
      expect(config1.to).toEqual(config1.min);

      const config2 = model.validate({
        min: 0,
        max: 10,
        from: -5,
        to: 5,
      });
      expect(config2.from).toEqual(config2.min);
      expect(config2.to).toEqual(5);

      const config3 = model.validate({
        min: 0,
        max: 10,
        from: 5,
        to: 15,
      });
      expect(config3.from).toEqual(5);
      expect(config3.to).toEqual(config3.max);

      const config4 = model.validate({
        min: 0,
        max: 10,
        from: 11,
        to: 15,
      });
      expect(config4.from).toEqual(config4.max);
      expect(config4.to).toEqual(config4.max);
    });

    it('должен сделать свойство from кратным шагу слайдера', () => {
      const config1 = model.validate({ min: 0, from: 4, step: 1.5 });
      expect(config1.from).toEqual(4.5);

      const config2 = model.validate({ min: -1, from: 4.5, step: 1.5 });
      expect(config2.from).toEqual(5);
    });

    it('должен сделать свойство to кратным шагу слайдера', () => {
      const config1 = model.validate({
        min: 0,
        from: 0,
        to: 4,
        step: 1.5,
      });
      expect(config1.to).toEqual(4.5);

      const config2 = model.validate({
        min: -1,
        from: 0,
        to: 4.5,
        step: 1.5,
      });
      expect(config2.to).toEqual(5);
    });
  });

  describe('addObserver', () => {
    it('должен вернуть true, если наблюдатель был добавлен', () => {
      const model = new Model();
      expect(model.addObserver(() => {})).toEqual(true);
    });

    it('должен вернуть false, если наблюдатель уже существует', () => {
      const model = new Model();
      const observer = () => {};
      model.addObserver(observer);
      expect(model.addObserver(observer)).toEqual(false);
    });
  });

  describe('update', () => {
    it('должен один раз вызвать метод validate с параметром {}', () => {
      const model = new Model();
      const validate = spyOn(model, 'validate').and.callFake(() => {});
      model.update({});
      expect(validate).toHaveBeenCalledTimes(1);
      expect(validate).toHaveBeenCalledWith({});
    });

    it('должен один раз вызвать метод validate с параметром {a: 1}', () => {
      const model = new Model();
      const validate = spyOn(model, 'validate').and.callFake(() => {});
      model.update({ a: 1 });
      expect(validate).toHaveBeenCalledTimes(1);
      expect(validate).toHaveBeenCalledWith({ a: 1 });
    });

    it('должен один раз вызвать метод onUpdate, передав в качестве аргумента конфигурацию модели', () => {
      const fakeConfig = { onUpdate() {} };
      const onUpdate = spyOn(fakeConfig, 'onUpdate');
      const model = new Model(fakeConfig);
      model.update({});
      expect(onUpdate).toHaveBeenCalledTimes(1);
      expect(onUpdate).toHaveBeenCalledWith(model.getConfig());
    });

    it('должен один раз оповестить наблюдателей', () => {
      const observer = jasmine.createSpy();
      const model = new Model();
      model.addObserver(observer);
      model.update({});
      expect(observer).toHaveBeenCalledTimes(1);
    });
  });

  describe('reset', () => {
    it('должен вернуть настройки к настройкам по умолчанию', () => {
      const model = new Model();
      model.getConfig().min = 150;
      model.getConfig().max = 500;
      model.reset();
      expect(model.getConfig()).toEqual(defaultConfig);
    });

    it('должен вернуть настройки к пользовательским', () => {
      const model = new Model(customConfig);
      model.getConfig().min = 150;
      model.getConfig().max = 500;
      model.reset();
      expect(model.getConfig()).toEqual(customConfig);
    });

    it('должен один раз вызвать метод onUpdate, передав в качестве аргумента конфигурацию модели', () => {
      const fakeConfig = { onUpdate() {} };
      const onUpdate = spyOn(fakeConfig, 'onUpdate');
      const model = new Model(fakeConfig);
      model.reset();
      expect(onUpdate).toHaveBeenCalledTimes(1);
      expect(onUpdate).toHaveBeenCalledWith(model.getConfig());
    });

    it('должен один раз оповестить наблюдателей', () => {
      const o = jasmine.createSpy();
      const model = new Model();
      model.addObserver(o);
      model.update({});
      expect(o).toHaveBeenCalledTimes(1);
    });
  });

  describe('getNearestHandle', () => {
    it('должен вернуть FROM, если range равен false', () => {
      const model = new Model({ from: 0, to: 100, range: false });
      const handle1 = model.getNearestHandle(0);
      const handle2 = model.getNearestHandle(100);
      expect(handle1).toEqual(model.handle.FROM);
      expect(handle2).toEqual(model.handle.FROM);
    });

    it('должен вернуть FROM', () => {
      const model = new Model({ from: 20, to: 100, range: true });
      const handle = model.getNearestHandle(0);
      expect(handle).toEqual(model.handle.FROM);

      const model2 = new Model({ from: 20, to: 20, range: true });
      const handle2 = model2.getNearestHandle(0);
      expect(handle2).toEqual(model2.handle.FROM);
    });

    it('должен вернуть TO', () => {
      const model = new Model({ from: 20, to: 100, range: true });
      const handle = model.getNearestHandle(80);
      expect(handle).toEqual(model.handle.TO);

      const model2 = new Model({ from: 20, to: 20, range: true });
      const handle2 = model2.getNearestHandle(80);
      expect(handle2).toEqual(model.handle.TO);
    });
  });

  describe('slide', () => {
    it('должен один раз оповестить наблюдателей', () => {
      const o = jasmine.createSpy();
      const model = new Model();
      model.addObserver(o);
      model.startSlide(model.handle.FROM);
      model.slide(5);
      expect(o).toHaveBeenCalledTimes(1);
    });

    it('должен один раз вызвать метод onSlide, передав в качестве аргумента конфигурацию модели', () => {
      const fakeConfig = { onSlide() {} };
      const onSlide = spyOn(fakeConfig, 'onSlide');
      const model = new Model(fakeConfig);
      model.startSlide(model.handle.FROM);
      model.slide(5);
      expect(onSlide).toHaveBeenCalledTimes(1);
      expect(onSlide).toHaveBeenCalledWith(model.getConfig());
    });

    it('должен один раз вызвать метод onChange, передав в качестве аргумента конфигурацию модели', () => {
      const fakeConfig = { onChange() {} };
      const onChange = spyOn(fakeConfig, 'onChange');
      const model = new Model(fakeConfig);
      model.startSlide(model.handle.FROM);
      model.slide(5);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(model.getConfig());
    });

    it('не должен вызывать метод onChange, если значение from не было изменено', () => {
      const fakeConfig = { from: 0, onChange() {} };
      const onChange = spyOn(fakeConfig, 'onChange');
      const model = new Model(fakeConfig);
      model.startSlide(model.handle.FROM);
      model.slide(0);
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('не должен вызывать метод onChange, если значение to не было изменено', () => {
      const fakeConfig = {
        range: true,
        from: 0,
        to: 1,
        onChange() {},
      };
      const onChange = spyOn(fakeConfig, 'onChange');
      const model = new Model(fakeConfig);
      model.startSlide(model.handle.TO);
      model.slide(1);
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('startSlide', () => {
    it('должен один раз вызвать метод onStart, передав в качестве аргумента конфигурацию модели', () => {
      const fakeConfig = { onStart() {} };
      const onStart = spyOn(fakeConfig, 'onStart');
      const model = new Model(fakeConfig);
      model.startSlide(model.handle.FROM);
      model.startSlide(model.handle.FROM);
      expect(onStart).toHaveBeenCalledTimes(1);
      expect(onStart).toHaveBeenCalledWith(model.getConfig());
    });

    it('должен при изменении состояния вернуть true, иначе false', () => {
      const model = new Model();
      const result1 = model.startSlide(model.handle.FROM);
      const result2 = model.startSlide(model.handle.FROM);
      expect(result1).toEqual(true);
      expect(result2).toEqual(false);
    });
  });

  describe('finishSlide', () => {
    it('должен один раз вызвать метод onFinish, передав в качестве аргумента конфигурацию модели', () => {
      const fakeConfig = { onFinish() {} };
      const onFinish = spyOn(fakeConfig, 'onFinish');
      const model = new Model(fakeConfig);
      model.startSlide(model.handle.FROM);
      model.finishSlide();
      model.finishSlide();
      expect(onFinish).toHaveBeenCalledTimes(1);
      expect(onFinish).toHaveBeenCalledWith(model.getConfig());
    });

    it('должен при изменении состояния вернуть true, иначе false', () => {
      const model = new Model();
      model.startSlide(model.handle.FROM);
      const result1 = model.finishSlide();
      const result2 = model.finishSlide();
      expect(result1).toEqual(true);
      expect(result2).toEqual(false);
    });
  });
});
