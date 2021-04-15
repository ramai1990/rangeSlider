class ConfigNormalizer {
  constructor() {
    this._error = {
      MIN_SHOULD_BE_NUMBER: 'Тип свойства min должно быть number',
      MAX_SHOULD_BE_NUMBER: 'Тип свойства max должно быть number',
      FROM_SHOULD_BE_NUMBER: 'Тип свойства from должно быть number',
      TO_SHOULD_BE_NUMBER: 'Тип свойства to должно быть number',
      STEP_SHOULD_BE_NUMBER: 'Тип свойства step должно быть number',
      RANGE_SHOULD_BE_BOOLEAN: 'Тип свойства range должно быть boolean',
      VERTICAL_SHOULD_BE_BOOLEAN: 'Тип свойства vertical должно быть boolean',
      DISPLAY_HINT_SHOULD_BE_BOOLEAN: 'Тип свойства displayHint должно быть boolean',
      DISPLAY_TRACKER_SHOULD_BE_BOOLEAN: 'Тип свойства displayTracker должно быть boolean',
      DISPLAY_GRID_SHOULD_BE_BOOLEAN: 'Тип свойства displayGrid должно быть boolean',
      GRID_STEP_SHOULD_BE_NUMBER: 'Тип свойства gridStep должно быть number',
      DISABLED_SHOULD_BE_BOOLEAN: 'Тип свойства disabled должно быть boolean',
      ON_INIT_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onInit должно быть function или null',
      ON_START_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onStart должно быть function или null',
      ON_SLIDE_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onSlide должно быть function или null',
      ON_CHANGE_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onChange должно быть function или null',
      ON_FINISH_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onFinish должно быть function или null',
      ON_UPDATE_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onUpdate должно быть function или null',
    };
  }

  getNormalizedConfig(config) {
    let {
      min,
      max,
      step,
      from,
      to,
    } = config;

    min = Number(min.toFixed(4));
    max = Number(max.toFixed(4));
    step = Number(step.toFixed(4));

    if (max < min) {
      max = min;
    }

    from = this.getNormalizedValue(from, min, max, step);
    to = this.getNormalizedValue(to, from, max, step);

    if (from > to) {
      from = to;
    }

    return {
      ...config,
      min,
      max,
      step,
      from,
      to,
    };
  }

  getNormalizedValue(value, min, max, step) {
    let alignedValue = value;
    const sliderSize = max - min;

    if (alignedValue < min) {
      alignedValue = min;
    } else if (alignedValue <= (max - (sliderSize % step))) {
      const point1 = Number((alignedValue - ((alignedValue - min) % step)).toFixed(4));
      const point2 = Number(((alignedValue + step) - ((alignedValue - min) % step)).toFixed(4));
      const average = (point1 + point2) / 2;
      alignedValue = alignedValue < average ? point1 : point2;
    } else {
      alignedValue = max;
    }

    return alignedValue;
  }

  checkConfigTypes(config) {
    if (typeof config.min !== 'number' || Number.isNaN(config.min)) {
      throw new Error(this._error.MIN_SHOULD_BE_NUMBER);
    }

    if (typeof config.max !== 'number' || Number.isNaN(config.max)) {
      throw new Error(this._error.MAX_SHOULD_BE_NUMBER);
    }

    if (typeof config.from !== 'number' || Number.isNaN(config.from)) {
      throw new Error(this._error.FROM_SHOULD_BE_NUMBER);
    }

    if (typeof config.to !== 'number' || Number.isNaN(config.to)) {
      throw new Error(this._error.TO_SHOULD_BE_NUMBER);
    }

    if (typeof config.step !== 'number' || Number.isNaN(config.step)) {
      throw new Error(this._error.STEP_SHOULD_BE_NUMBER);
    }

    if (typeof config.range !== 'boolean') {
      throw new Error(this._error.RANGE_SHOULD_BE_BOOLEAN);
    }

    if (typeof config.vertical !== 'boolean') {
      throw new Error(this._error.VERTICAL_SHOULD_BE_BOOLEAN);
    }

    if (typeof config.displayHint !== 'boolean') {
      throw new Error(this._error.DISPLAY_HINT_SHOULD_BE_BOOLEAN);
    }

    if (typeof config.displayTracker !== 'boolean') {
      throw new Error(this._error.DISPLAY_TRACKER_SHOULD_BE_BOOLEAN);
    }

    if (typeof config.displayGrid !== 'boolean') {
      throw new Error(this._error.DISPLAY_GRID_SHOULD_BE_BOOLEAN);
    }

    if (typeof config.gridStep !== 'number' || Number.isNaN(config.gridStep)) {
      throw new Error(this._error.GRID_STEP_SHOULD_BE_NUMBER);
    }

    if (typeof config.disabled !== 'boolean') {
      throw new Error(this._error.DISABLED_SHOULD_BE_BOOLEAN);
    }

    if (typeof config.onInit !== 'function' && config.onInit !== null) {
      throw new Error(this._error.ON_INIT_SHOULD_BE_FUNCTION_OR_NULL);
    }

    if (typeof config.onStart !== 'function' && config.onStart !== null) {
      throw new Error(this._error.ON_START_SHOULD_BE_FUNCTION_OR_NULL);
    }

    if (typeof config.onSlide !== 'function' && config.onSlide !== null) {
      throw new Error(this._error.ON_SLIDE_SHOULD_BE_FUNCTION_OR_NULL);
    }

    if (typeof config.onChange !== 'function' && config.onChange !== null) {
      throw new Error(this._error.ON_CHANGE_SHOULD_BE_FUNCTION_OR_NULL);
    }

    if (typeof config.onFinish !== 'function' && config.onFinish !== null) {
      throw new Error(this._error.ON_FINISH_SHOULD_BE_FUNCTION_OR_NULL);
    }

    if (typeof config.onUpdate !== 'function' && config.onUpdate !== null) {
      throw new Error(this._error.ON_UPDATE_SHOULD_BE_FUNCTION_OR_NULL);
    }
  }

  toString() {
    return '{"class": "ConfigNormalizer"}';
  }
}

export default ConfigNormalizer;
