import ConfigNormalizer from './ConfigNormalizer';

class Model {
  constructor(...configs) {
    this.handle = { FROM: 1, TO: 2 };
    this._currentHandle = null;
    this._observers = [];
    this._initialConfig = null;
    this._config = null;
    this._configNormalizer = new ConfigNormalizer();

    this._initConfig(configs);
  }

  addObserver(observer) {
    const duplicate = this._observers.filter(o => o === observer);
    if (duplicate.length > 0) {
      return false;
    }

    this._observers.push(observer);

    return true;
  }

  getConfig() {
    return this._config;
  }

  startSlide(handle) {
    if (this._currentHandle || this._config.disabled) {
      return false;
    }

    this._currentHandle = handle;
    this._call(this._config.onStart);

    return true;
  }

  finishSlide() {
    if (!this._currentHandle) {
      return false;
    }

    this._currentHandle = null;
    this._call(this._config.onFinish);

    return true;
  }

  slide(value) {
    if (!this._currentHandle) {
      return;
    }

    const configNormalizer = this._configNormalizer;
    const config = this._config;
    const {
      min,
      max,
      from,
      to,
      step,
      range,
      onChange,
      onSlide,
    } = config;

    if (this._currentHandle === this.handle.FROM) {
      config.from = configNormalizer.getNormalizedValue(value, min, range ? to : max, step);
    } else if (this._currentHandle === this.handle.TO) {
      config.to = configNormalizer.getNormalizedValue(value, from, max, step);
    }

    if ((config.from !== from) || (config.to !== to)) {
      this._call(onChange);
    }

    this._call(onSlide);
    this._notifyObservers();
  }

  update(config) {
    const { onUpdate } = this._config;

    Object.assign(this._config, this.validate(config));
    this._call(onUpdate);
    this._notifyObservers();
  }

  reset() {
    this.update(this._initialConfig);
  }

  validate(config) {
    const configNormalizer = this._configNormalizer;
    const validatedConfig = { ...this._config, ...config };

    configNormalizer.checkConfigTypes(validatedConfig);

    return configNormalizer.getNormalizedConfig(validatedConfig);
  }

  getNearestHandle(value) {
    const { range, from, to } = this._config;

    if (range) {
      const distanceToFrom = Math.abs(from - value - 1);
      const distanceToTo = Math.abs(to - value + 1);
      return distanceToFrom > distanceToTo ? this.handle.TO : this.handle.FROM;
    }

    return this.handle.FROM;
  }

  toString() {
    return JSON.stringify({ class: 'Model', ...this._config });
  }

  _initConfig(configs) {
    this._config = {
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

    configs.forEach((config) => {
      Object.assign(this._config, config);
    });

    this._config = this.validate(this._config);
    this._initialConfig = { ...this._config };
    this._call(this._config.onInit);
  }

  _notifyObservers() {
    const config = this._config;

    this._observers.forEach((observer) => {
      observer(config);
    });
  }

  _call(func) {
    if (typeof func === 'function') {
      func(this._config);
    }
  }
}

export default Model;
