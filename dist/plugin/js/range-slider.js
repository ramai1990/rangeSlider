/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/ConfigNormalizer/ConfigNormalizer.js":
/*!*************************************************!*\
  !*** ./js/ConfigNormalizer/ConfigNormalizer.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass ConfigNormalizer {\n  constructor() {\n    this._error = {\n      MIN_SHOULD_BE_NUMBER: 'Тип свойства min должно быть number',\n      MAX_SHOULD_BE_NUMBER: 'Тип свойства max должно быть number',\n      FROM_SHOULD_BE_NUMBER: 'Тип свойства from должно быть number',\n      TO_SHOULD_BE_NUMBER: 'Тип свойства to должно быть number',\n      STEP_SHOULD_BE_NUMBER: 'Тип свойства step должно быть number',\n      RANGE_SHOULD_BE_BOOLEAN: 'Тип свойства range должно быть boolean',\n      VERTICAL_SHOULD_BE_BOOLEAN: 'Тип свойства vertical должно быть boolean',\n      DISPLAY_HINT_SHOULD_BE_BOOLEAN: 'Тип свойства displayHint должно быть boolean',\n      DISPLAY_TRACKER_SHOULD_BE_BOOLEAN: 'Тип свойства displayTracker должно быть boolean',\n      DISPLAY_GRID_SHOULD_BE_BOOLEAN: 'Тип свойства displayGrid должно быть boolean',\n      GRID_STEP_SHOULD_BE_NUMBER: 'Тип свойства gridStep должно быть number',\n      DISABLED_SHOULD_BE_BOOLEAN: 'Тип свойства disabled должно быть boolean',\n      ON_INIT_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onInit должно быть function или null',\n      ON_START_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onStart должно быть function или null',\n      ON_SLIDE_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onSlide должно быть function или null',\n      ON_CHANGE_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onChange должно быть function или null',\n      ON_FINISH_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onFinish должно быть function или null',\n      ON_UPDATE_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onUpdate должно быть function или null',\n    };\n  }\n\n  getNormalizedConfig(config) {\n    let {\n      min,\n      max,\n      step,\n      from,\n      to,\n    } = config;\n\n    min = Number(min.toFixed(4));\n    max = Number(max.toFixed(4));\n    step = Number(step.toFixed(4));\n\n    if (max < min) {\n      max = min;\n    }\n\n    from = this.getNormalizedValue(from, min, max, step);\n    to = this.getNormalizedValue(to, from, max, step);\n\n    if (from > to) {\n      from = to;\n    }\n\n    return {\n      ...config,\n      min,\n      max,\n      step,\n      from,\n      to,\n    };\n  }\n\n  getNormalizedValue(value, min, max, step) {\n    let alignedValue = value;\n    const sliderSize = max - min;\n\n    if (alignedValue < min) {\n      alignedValue = min;\n    } else if (alignedValue <= (max - (sliderSize % step))) {\n      const point1 = Number((alignedValue - ((alignedValue - min) % step)).toFixed(4));\n      const point2 = Number(((alignedValue + step) - ((alignedValue - min) % step)).toFixed(4));\n      const average = (point1 + point2) / 2;\n      alignedValue = alignedValue < average ? point1 : point2;\n    } else {\n      alignedValue = max;\n    }\n\n    return alignedValue;\n  }\n\n  checkConfigTypes(config) {\n    if (typeof config.min !== 'number' || Number.isNaN(config.min)) {\n      throw new Error(this._error.MIN_SHOULD_BE_NUMBER);\n    }\n\n    if (typeof config.max !== 'number' || Number.isNaN(config.max)) {\n      throw new Error(this._error.MAX_SHOULD_BE_NUMBER);\n    }\n\n    if (typeof config.from !== 'number' || Number.isNaN(config.from)) {\n      throw new Error(this._error.FROM_SHOULD_BE_NUMBER);\n    }\n\n    if (typeof config.to !== 'number' || Number.isNaN(config.to)) {\n      throw new Error(this._error.TO_SHOULD_BE_NUMBER);\n    }\n\n    if (typeof config.step !== 'number' || Number.isNaN(config.step)) {\n      throw new Error(this._error.STEP_SHOULD_BE_NUMBER);\n    }\n\n    if (typeof config.range !== 'boolean') {\n      throw new Error(this._error.RANGE_SHOULD_BE_BOOLEAN);\n    }\n\n    if (typeof config.vertical !== 'boolean') {\n      throw new Error(this._error.VERTICAL_SHOULD_BE_BOOLEAN);\n    }\n\n    if (typeof config.displayHint !== 'boolean') {\n      throw new Error(this._error.DISPLAY_HINT_SHOULD_BE_BOOLEAN);\n    }\n\n    if (typeof config.displayTracker !== 'boolean') {\n      throw new Error(this._error.DISPLAY_TRACKER_SHOULD_BE_BOOLEAN);\n    }\n\n    if (typeof config.displayGrid !== 'boolean') {\n      throw new Error(this._error.DISPLAY_GRID_SHOULD_BE_BOOLEAN);\n    }\n\n    if (typeof config.gridStep !== 'number' || Number.isNaN(config.gridStep)) {\n      throw new Error(this._error.GRID_STEP_SHOULD_BE_NUMBER);\n    }\n\n    if (typeof config.disabled !== 'boolean') {\n      throw new Error(this._error.DISABLED_SHOULD_BE_BOOLEAN);\n    }\n\n    if (typeof config.onInit !== 'function' && config.onInit !== null) {\n      throw new Error(this._error.ON_INIT_SHOULD_BE_FUNCTION_OR_NULL);\n    }\n\n    if (typeof config.onStart !== 'function' && config.onStart !== null) {\n      throw new Error(this._error.ON_START_SHOULD_BE_FUNCTION_OR_NULL);\n    }\n\n    if (typeof config.onSlide !== 'function' && config.onSlide !== null) {\n      throw new Error(this._error.ON_SLIDE_SHOULD_BE_FUNCTION_OR_NULL);\n    }\n\n    if (typeof config.onChange !== 'function' && config.onChange !== null) {\n      throw new Error(this._error.ON_CHANGE_SHOULD_BE_FUNCTION_OR_NULL);\n    }\n\n    if (typeof config.onFinish !== 'function' && config.onFinish !== null) {\n      throw new Error(this._error.ON_FINISH_SHOULD_BE_FUNCTION_OR_NULL);\n    }\n\n    if (typeof config.onUpdate !== 'function' && config.onUpdate !== null) {\n      throw new Error(this._error.ON_UPDATE_SHOULD_BE_FUNCTION_OR_NULL);\n    }\n  }\n\n  toString() {\n    return '{\"class\": \"ConfigNormalizer\"}';\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfigNormalizer);\n\n\n//# sourceURL=webpack:///./js/ConfigNormalizer/ConfigNormalizer.js?");

/***/ }),

/***/ "./js/Controller/Controller.js":
/*!*************************************!*\
  !*** ./js/Controller/Controller.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Controller {\n  constructor(model, views, id) {\n    this._model = model;\n    this._views = views;\n    this._id = id;\n    this._addObservers();\n    this._bindEvents();\n  }\n\n  toString() {\n    return `{\"class\": \"Controller\", \"id\": \"${this._id}\"}`;\n  }\n\n  _addObservers() {\n    this._model.addObserver(this._views.sliderView.update.bind(this._views.sliderView));\n    this._model.addObserver(this._views.handleView.update.bind(this._views.handleView));\n    this._model.addObserver(this._views.hintView.update.bind(this._views.hintView));\n    this._model.addObserver(this._views.trackerView.update.bind(this._views.trackerView));\n    this._model.addObserver(this._views.gridView.update.bind(this._views.gridView));\n  }\n\n  _bindEvents() {\n    const $window = $(window);\n    const $document = $(document);\n\n    const handleRangeSliderMouseDown = this._handleRangeSliderMouseDown.bind(this);\n    const handleWindowMouseMove = this._handleWindowMouseMove.bind(this);\n    const handleWindowMouseUp = this._handleWindowMouseUp.bind(this);\n    const handleWindowResize = this._handleWindowResize.bind(this);\n    const handleDocumentReady = this._handleDocumentReady.bind(this);\n\n    this._views.sliderView.getRoot().on(`mousedown.Controller${this._id}`, handleRangeSliderMouseDown);\n    $window.on(`mousemove.Controller${this._id}`, handleWindowMouseMove);\n    $window.on(`mouseup.Controller${this._id}`, handleWindowMouseUp);\n    $window.on(`resize.Controller${this._id}`, handleWindowResize);\n    $document.ready(handleDocumentReady);\n  }\n\n  _handleRangeSliderMouseDown(event) {\n    event.preventDefault();\n\n    const value = this._calculateValue(event);\n    const handle = this._model.getNearestHandle(value);\n\n    this._model.startSlide(handle);\n    this._model.slide(value);\n  }\n\n  _handleWindowMouseMove(event) {\n    const value = this._calculateValue(event);\n\n    this._model.slide(value);\n  }\n\n  _calculateValue(event) {\n    const { vertical, min, max } = this._model.getConfig();\n\n    const point = this._getPointCoord(event);\n    const sliderSizeInPx = this._getSliderSizeInPx();\n    const k = vertical\n      ? 1 - point / (sliderSizeInPx - 1)\n      : point / (sliderSizeInPx - 1);\n    const value = min + (max - min) * k;\n\n    return value;\n  }\n\n  _getPointCoord(event) {\n    const { vertical } = this._model.getConfig();\n    const { sliderView } = this._views;\n\n    const pointCoordX = event.pageX - sliderView.getRoot().offset().left;\n    const pointCoordY = event.pageY - sliderView.getRoot().offset().top;\n\n    return vertical ? pointCoordY : pointCoordX;\n  }\n\n  _getSliderSizeInPx() {\n    const { vertical } = this._model.getConfig();\n    const { sliderView } = this._views;\n\n    return vertical ? sliderView.getRoot().height() : sliderView.getRoot().width();\n  }\n\n  _handleWindowMouseUp() {\n    this._model.finishSlide();\n  }\n\n  _handleWindowResize() {\n    this._updateViews();\n  }\n\n  _handleDocumentReady() {\n    this._updateViews();\n  }\n\n  _updateViews() {\n    const {\n      sliderView,\n      handleView,\n      hintView,\n      trackerView,\n      gridView,\n    } = this._views;\n\n    const config = this._model.getConfig();\n\n    sliderView.update(config);\n    handleView.update(config);\n    hintView.update(config);\n    trackerView.update(config);\n    gridView.update(config);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Controller);\n\n\n//# sourceURL=webpack:///./js/Controller/Controller.js?");

/***/ }),

/***/ "./js/Model/Model.js":
/*!***************************!*\
  !*** ./js/Model/Model.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ConfigNormalizer_ConfigNormalizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ConfigNormalizer/ConfigNormalizer */ \"./js/ConfigNormalizer/ConfigNormalizer.js\");\n\n\nclass Model {\n  constructor(...configs) {\n    this.handle = { FROM: 1, TO: 2 };\n    this._currentHandle = null;\n    this._observers = [];\n    this._initialConfig = null;\n    this._config = null;\n    this._configNormalizer = new _ConfigNormalizer_ConfigNormalizer__WEBPACK_IMPORTED_MODULE_0__.default();\n\n    this._initConfig(configs);\n  }\n\n  addObserver(observer) {\n    const duplicate = this._observers.filter(o => o === observer);\n    if (duplicate.length > 0) {\n      return false;\n    }\n\n    this._observers.push(observer);\n\n    return true;\n  }\n\n  getConfig() {\n    return this._config;\n  }\n\n  startSlide(handle) {\n    if (this._currentHandle || this._config.disabled) {\n      return false;\n    }\n\n    this._currentHandle = handle;\n    this._call(this._config.onStart);\n\n    return true;\n  }\n\n  finishSlide() {\n    if (!this._currentHandle) {\n      return false;\n    }\n\n    this._currentHandle = null;\n    this._call(this._config.onFinish);\n\n    return true;\n  }\n\n  slide(value) {\n    if (!this._currentHandle) {\n      return;\n    }\n\n    const configNormalizer = this._configNormalizer;\n    const config = this._config;\n    const {\n      min,\n      max,\n      from,\n      to,\n      step,\n      range,\n      onChange,\n      onSlide,\n    } = config;\n\n    if (this._currentHandle === this.handle.FROM) {\n      config.from = configNormalizer.getNormalizedValue(value, min, range ? to : max, step);\n    } else if (this._currentHandle === this.handle.TO) {\n      config.to = configNormalizer.getNormalizedValue(value, from, max, step);\n    }\n\n    if ((config.from !== from) || (config.to !== to)) {\n      this._call(onChange);\n    }\n\n    this._call(onSlide);\n    this._notifyObservers();\n  }\n\n  update(config) {\n    const { onUpdate } = this._config;\n\n    Object.assign(this._config, this.validate(config));\n    this._call(onUpdate);\n    this._notifyObservers();\n  }\n\n  reset() {\n    this.update(this._initialConfig);\n  }\n\n  validate(config) {\n    const configNormalizer = this._configNormalizer;\n    const validatedConfig = { ...this._config, ...config };\n\n    configNormalizer.checkConfigTypes(validatedConfig);\n\n    return configNormalizer.getNormalizedConfig(validatedConfig);\n  }\n\n  getNearestHandle(value) {\n    const { range, from, to } = this._config;\n\n    if (range) {\n      const distanceToFrom = Math.abs(from - value - 1);\n      const distanceToTo = Math.abs(to - value + 1);\n      return distanceToFrom > distanceToTo ? this.handle.TO : this.handle.FROM;\n    }\n\n    return this.handle.FROM;\n  }\n\n  toString() {\n    return JSON.stringify({ class: 'Model', ...this._config });\n  }\n\n  _initConfig(configs) {\n    this._config = {\n      min: 0,\n      max: 50,\n      range: false,\n      from: 0,\n      to: 10,\n      step: 1,\n      vertical: false,\n      displayHint: false,\n      displayTracker: false,\n      displayGrid: false,\n      gridStep: 10,\n      disabled: false,\n      onInit: null,\n      onStart: null,\n      onSlide: null,\n      onChange: null,\n      onFinish: null,\n      onUpdate: null,\n    };\n\n    configs.forEach((config) => {\n      Object.assign(this._config, config);\n    });\n\n    this._config = this.validate(this._config);\n    this._initialConfig = { ...this._config };\n    this._call(this._config.onInit);\n  }\n\n  _notifyObservers() {\n    const config = this._config;\n\n    this._observers.forEach((observer) => {\n      observer(config);\n    });\n  }\n\n  _call(func) {\n    if (typeof func === 'function') {\n      func(this._config);\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Model);\n\n\n//# sourceURL=webpack:///./js/Model/Model.js?");

/***/ }),

/***/ "./js/RangeSlider/RangeSlider.js":
/*!***************************************!*\
  !*** ./js/RangeSlider/RangeSlider.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Model_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model/Model */ \"./js/Model/Model.js\");\n/* harmony import */ var _Controller_Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Controller/Controller */ \"./js/Controller/Controller.js\");\n/* harmony import */ var _View_SliderView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../View/SliderView */ \"./js/View/SliderView.js\");\n/* harmony import */ var _View_HandleView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../View/HandleView */ \"./js/View/HandleView.js\");\n/* harmony import */ var _View_HintView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../View/HintView */ \"./js/View/HintView.js\");\n/* harmony import */ var _View_TrackerView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../View/TrackerView */ \"./js/View/TrackerView.js\");\n/* harmony import */ var _View_GridView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../View/GridView */ \"./js/View/GridView.js\");\n\n\n\n\n\n\n\n\nclass RangeSlider {\n  constructor(model) {\n    this.handle = model.handle;\n    this._model = model;\n  }\n\n  slide(handle, value) {\n    this._model.startSlide(handle);\n    this._model.slide(value);\n    this._model.finishSlide();\n  }\n\n  update(config) {\n    this._model.update(config);\n  }\n\n  reset() {\n    this._model.reset();\n  }\n\n  toString() {\n    return '{\"class\": \"RangeSlider\"}';\n  }\n\n  static init(jquery) {\n    const $ = jquery;\n\n    $.fn.rangeSlider = function rangeSlider(config) {\n      return this.each(function createRangeSlider(controllerId) {\n        if (!$(this).data('range-slider')) {\n          const htmlConfig = $(this).data();\n          const model = new _Model_Model__WEBPACK_IMPORTED_MODULE_0__.default(config, htmlConfig);\n\n          const sliderView = new _View_SliderView__WEBPACK_IMPORTED_MODULE_2__.default(this);\n          const handleView = new _View_HandleView__WEBPACK_IMPORTED_MODULE_3__.default(this);\n          const hintView = new _View_HintView__WEBPACK_IMPORTED_MODULE_4__.default(handleView);\n          const trackerView = new _View_TrackerView__WEBPACK_IMPORTED_MODULE_5__.default(this);\n          const gridView = new _View_GridView__WEBPACK_IMPORTED_MODULE_6__.default(this);\n\n          new _Controller_Controller__WEBPACK_IMPORTED_MODULE_1__.default(model, {\n            sliderView,\n            handleView,\n            hintView,\n            trackerView,\n            gridView,\n          }, controllerId);\n\n          $(this).data('range-slider', new RangeSlider(model));\n        }\n      });\n    };\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RangeSlider);\n\n\n//# sourceURL=webpack:///./js/RangeSlider/RangeSlider.js?");

/***/ }),

/***/ "./js/View/GridView.js":
/*!*****************************!*\
  !*** ./js/View/GridView.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass GridView {\n  constructor(root) {\n    this._$grid = $('<div>').appendTo(root).addClass('range-slider__grid');\n  }\n\n  update(config) {\n    const { displayGrid } = config;\n\n    if (displayGrid) {\n      this._displayGrid();\n      this._updateGrid(config);\n    } else {\n      this._hideGrid();\n    }\n  }\n\n  toString() {\n    return '{\"class\": \"GridView\"}';\n  }\n\n  _displayGrid() {\n    this._$grid.removeClass('range-slider__grid_hidden');\n  }\n\n  _hideGrid() {\n    this._$grid.addClass('range-slider__grid_hidden');\n  }\n\n  _updateGrid({ min, max, gridStep, vertical }) {\n    this._$grid.empty();\n\n    for (let i = min; i < max; i += gridStep) {\n      const gridMarkLeftOffsetInPercent = (i - min) / (max - min) * 100;\n      const gridDirection = vertical ? 'bottom' : 'left';\n      this._addGridMark(i, gridMarkLeftOffsetInPercent, gridDirection);\n\n      if (i + gridStep >= max) {\n        this._addGridMark(max, 100, gridDirection);\n      }\n    }\n  }\n\n  _addGridMark(value, offset, direction) {\n    $('<div>')\n      .appendTo(this._$grid)\n      .addClass('range-slider__grid-mark')\n      .text(value)\n      .css(direction, `${offset}%`);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridView);\n\n\n//# sourceURL=webpack:///./js/View/GridView.js?");

/***/ }),

/***/ "./js/View/HandleView.js":
/*!*******************************!*\
  !*** ./js/View/HandleView.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass HandleView {\n  constructor(root) {\n    this._$leftHandle = $('<div>').appendTo(root).addClass('range-slider__handle');\n    this._$rightHandle = $('<div>').appendTo(root).addClass('range-slider__handle');\n  }\n\n  getLeftHandle() {\n    return this._$leftHandle;\n  }\n\n  getRightHandle() {\n    return this._$rightHandle;\n  }\n\n  update(config) {\n    const { range } = config;\n\n    if (range) {\n      this._displayRightHandle();\n    } else {\n      this._hideRightHandle();\n    }\n\n    this._calculateHandlePosition(config);\n  }\n\n  toString() {\n    return '{\"class\": \"HandleView\"}';\n  }\n\n  _displayRightHandle() {\n    this._$rightHandle.removeClass('range-slider__handle_hidden');\n  }\n\n  _hideRightHandle() {\n    this._$rightHandle.addClass('range-slider__handle_hidden');\n  }\n\n  _calculateHandlePosition({ min, max, from, to, vertical }) {\n    const fromInPercent = min !== max\n      ? (from - min) / (max - min) * 100\n      : 0;\n    const toInPercent = min !== max\n      ? (to - min) / (max - min) * 100\n      : 0;\n\n    if (vertical) {\n      this._$leftHandle.css('bottom', `${fromInPercent}%`).css('left', '');\n      this._$rightHandle.css('bottom', `${toInPercent}%`).css('left', '');\n    } else {\n      this._$leftHandle.css('left', `${fromInPercent}%`).css('bottom', '');\n      this._$rightHandle.css('left', `${toInPercent}%`).css('bottom', '');\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HandleView);\n\n\n//# sourceURL=webpack:///./js/View/HandleView.js?");

/***/ }),

/***/ "./js/View/HintView.js":
/*!*****************************!*\
  !*** ./js/View/HintView.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass HintView {\n  constructor(handleView) {\n    this._handleView = handleView;\n    this._$leftHint = $('<div>').appendTo(handleView.getLeftHandle()).addClass('range-slider__hint');\n    this._$rightHint = $('<div>').appendTo(handleView.getRightHandle()).addClass('range-slider__hint');\n  }\n\n  update(config) {\n    const { displayHint } = config;\n\n    if (displayHint) {\n      this._displayHints();\n      this._setHintText(config);\n      this._calculateHintPosition(config);\n    } else {\n      this._hideHints();\n    }\n  }\n\n  toString() {\n    return '{\"class\": \"HintView\"}';\n  }\n\n  _displayHints() {\n    this._$leftHint.removeClass('range-slider__hint_hidden');\n    this._$rightHint.removeClass('range-slider__hint_hidden');\n  }\n\n  _hideHints() {\n    this._$leftHint.addClass('range-slider__hint_hidden');\n    this._$rightHint.addClass('range-slider__hint_hidden');\n  }\n\n  _setHintText({ from, to }) {\n    this._$leftHint.text(from);\n    this._$rightHint.text(to);\n  }\n\n  _calculateHintPosition({ vertical, from, to }) {\n    const $leftHint = this._$leftHint;\n    const $rightHint = this._$rightHint;\n\n    const $leftHandle = this._handleView.getLeftHandle();\n    const $rightHandle = this._handleView.getRightHandle();\n\n    const leftHandleTopSide = $leftHandle.offset().top;\n    const leftHandleBottomSide = $leftHandle.offset().top + $leftHandle.outerHeight();\n    const leftHandleLeftSide = $leftHandle.offset().left;\n    const leftHandleRightSide = $leftHandle.offset().left + $leftHandle.outerWidth();\n\n    const rightHandleTopSide = $rightHandle.offset().top;\n    const rightHandleBottomSide = $rightHandle.offset().top + $rightHandle.outerHeight();\n    const rightHandleLeftSide = $rightHandle.offset().left;\n    const rightHandleRightSide = $rightHandle.offset().left + $rightHandle.outerWidth();\n\n    if (vertical) {\n      this._alignHintBetweenVerticalPoints($leftHint, leftHandleTopSide, leftHandleBottomSide);\n      this._alignHintBetweenVerticalPoints($rightHint, rightHandleTopSide, rightHandleBottomSide);\n      $leftHint.css('left', '');\n      $rightHint.css('left', '');\n    } else {\n      this._alignHintBetweenHorizontalPoints($leftHint, leftHandleLeftSide, leftHandleRightSide);\n      this._alignHintBetweenHorizontalPoints($rightHint, rightHandleLeftSide, rightHandleRightSide);\n      $leftHint.css('top', '');\n      $rightHint.css('top', '');\n    }\n\n    if (this._checkCollisionOfHints()) {\n      $leftHint.text(`${from} — ${to}`);\n      $rightHint.addClass('range-slider__hint_hidden');\n      if (vertical) {\n        this._alignHintBetweenVerticalPoints($leftHint, rightHandleTopSide, leftHandleBottomSide);\n      } else {\n        this._alignHintBetweenHorizontalPoints($leftHint, leftHandleLeftSide, rightHandleRightSide);\n      }\n    }\n  }\n\n  _alignHintBetweenHorizontalPoints($hint, point1, point2) {\n    let left = point1 - ($hint.outerWidth() - point2 + point1) / 2;\n    left = this._getOffsetLeftWithoutFallingOutOfDocument(left, $hint.outerWidth());\n    $hint.offset({ left });\n  }\n\n  _alignHintBetweenVerticalPoints($hint, point1, point2) {\n    let top = point1 - ($hint.outerHeight() - point2 + point1) / 2;\n    top = this._getOffsetTopWithoutFallingOutOfDocument(top, $hint.outerHeight());\n    $hint.offset({ top });\n  }\n\n  _getOffsetLeftWithoutFallingOutOfDocument(left, width) {\n    const htmlWidth = $('html').width();\n    const maybeLeftGreaterThanHtmlWidth = left + width > htmlWidth\n      ? htmlWidth - width\n      : left;\n    const newLeft = left < 0 ? 0 : maybeLeftGreaterThanHtmlWidth;\n\n    return newLeft;\n  }\n\n  _getOffsetTopWithoutFallingOutOfDocument(top) {\n    return top < 0 ? 0 : top;\n  }\n\n  _checkCollisionOfHints() {\n    const $leftHint = this._$leftHint;\n    const $rightHint = this._$rightHint;\n\n    if ($leftHint.css('visibility') === 'hidden' || $rightHint.css('visibility') === 'hidden') {\n      return false;\n    }\n\n    const leftHintProjectionX = {\n      left: $leftHint.offset().left,\n      right: $leftHint.offset().left + $leftHint.outerWidth(),\n    };\n\n    const rightHintProjectionX = {\n      left: $rightHint.offset().left,\n      right: $rightHint.offset().left + $rightHint.outerWidth(),\n    };\n\n    const isCollisionX = !(\n      (leftHintProjectionX.left <= rightHintProjectionX.left\n      && leftHintProjectionX.right <= rightHintProjectionX.left)\n      || (leftHintProjectionX.left >= rightHintProjectionX.right\n      && leftHintProjectionX.right >= rightHintProjectionX.right)\n    );\n\n    const leftHintProjectionY = {\n      top: $leftHint.offset().top,\n      bottom: $leftHint.offset().top + $leftHint.outerHeight(),\n    };\n\n    const rightHintProjectionY = {\n      top: $rightHint.offset().top,\n      bottom: $rightHint.offset().top + $rightHint.outerHeight(),\n    };\n\n    const isCollisionY = !(\n      (leftHintProjectionY.top <= rightHintProjectionY.top\n      && leftHintProjectionY.bottom <= rightHintProjectionY.top)\n      || (leftHintProjectionY.top >= rightHintProjectionY.bottom\n      && leftHintProjectionY.bottom >= rightHintProjectionY.bottom)\n    );\n\n    return isCollisionX && isCollisionY;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HintView);\n\n\n//# sourceURL=webpack:///./js/View/HintView.js?");

/***/ }),

/***/ "./js/View/SliderView.js":
/*!*******************************!*\
  !*** ./js/View/SliderView.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass SliderView {\n  constructor(root) {\n    this._$root = $(root).addClass('range-slider');\n  }\n\n  getRoot() {\n    return this._$root;\n  }\n\n  update(config) {\n    const { vertical } = config;\n\n    if (vertical) {\n      this._setToVertical();\n    } else {\n      this._setToHorizontal();\n    }\n  }\n\n  toString() {\n    return '{\"class\": \"SliderView\"}';\n  }\n\n  _setToVertical() {\n    this._$root.addClass('range-slider_vertical');\n  }\n\n  _setToHorizontal() {\n    this._$root.removeClass('range-slider_vertical');\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SliderView);\n\n\n//# sourceURL=webpack:///./js/View/SliderView.js?");

/***/ }),

/***/ "./js/View/TrackerView.js":
/*!********************************!*\
  !*** ./js/View/TrackerView.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass TrackerView {\n  constructor(root) {\n    this._$tracker = $('<div>').appendTo(root).addClass('range-slider__tracker');\n  }\n\n  update(config) {\n    const { displayTracker } = config;\n\n    if (displayTracker) {\n      this._displayTracker();\n      this._calculateTrackerSize(config);\n      this._calculateTrackerPosition(config);\n    } else {\n      this._hideTracker();\n    }\n  }\n\n  toString() {\n    return '{\"class\": \"TrackerView\"}';\n  }\n\n  _displayTracker() {\n    this._$tracker.removeClass('range-slider__tracker_hidden');\n  }\n\n  _hideTracker() {\n    this._$tracker.addClass('range-slider__tracker_hidden');\n  }\n\n  _calculateTrackerSize({ min, max, from, to, range, vertical }) {\n    const fromInPercent = min !== max\n      ? (from - min) / (max - min) * 100\n      : 0;\n    const toInPercent = min !== max\n      ? (to - min) / (max - min) * 100\n      : 0;\n    const trackerSizeInPercent = range\n      ? toInPercent - fromInPercent\n      : fromInPercent;\n\n    if (vertical) {\n      this._$tracker.css('height', `${trackerSizeInPercent}%`).css('width', '');\n    } else {\n      this._$tracker.css('width', `${trackerSizeInPercent}%`).css('height', '');\n    }\n  }\n\n  _calculateTrackerPosition({ min, max, from, range, vertical }) {\n    const fromInPercent = (from - min) / (max - min) * 100;\n    const trackerOffsetInPercent = range ? fromInPercent : 0;\n\n    if (vertical) {\n      this._$tracker.css('bottom', `${trackerOffsetInPercent}%`).css('left', '');\n    } else {\n      this._$tracker.css('left', `${trackerOffsetInPercent}%`).css('bottom', '');\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrackerView);\n\n\n//# sourceURL=webpack:///./js/View/TrackerView.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/RangeSlider/RangeSlider.js");
/******/ 	
/******/ })()
;