class Controller {
  constructor(model, views, id) {
    this._model = model;
    this._views = views;
    this._id = id;
    this._addObservers();
    this._bindEvents();
  }

  toString() {
    return `{"class": "Controller", "id": "${this._id}"}`;
  }

  _addObservers() {
    this._model.addObserver(this._views.sliderView.update.bind(this._views.sliderView));
    this._model.addObserver(this._views.handleView.update.bind(this._views.handleView));
    this._model.addObserver(this._views.hintView.update.bind(this._views.hintView));
    this._model.addObserver(this._views.trackerView.update.bind(this._views.trackerView));
    this._model.addObserver(this._views.gridView.update.bind(this._views.gridView));
  }

  _bindEvents() {
    const $window = $(window);
    const $document = $(document);

    const handleRangeSliderMouseDown = this._handleRangeSliderMouseDown.bind(this);
    const handleWindowMouseMove = this._handleWindowMouseMove.bind(this);
    const handleWindowMouseUp = this._handleWindowMouseUp.bind(this);
    const handleWindowResize = this._handleWindowResize.bind(this);
    const handleDocumentReady = this._handleDocumentReady.bind(this);

    this._views.sliderView.getRoot().on(`mousedown.Controller${this._id}`, handleRangeSliderMouseDown);
    $window.on(`mousemove.Controller${this._id}`, handleWindowMouseMove);
    $window.on(`mouseup.Controller${this._id}`, handleWindowMouseUp);
    $window.on(`resize.Controller${this._id}`, handleWindowResize);
    $document.ready(handleDocumentReady);
  }

  _handleRangeSliderMouseDown(event) {
    event.preventDefault();

    const value = this._calculateValue(event);
    const handle = this._model.getNearestHandle(value);

    this._model.startSlide(handle);
    this._model.slide(value);
  }

  _handleWindowMouseMove(event) {
    const value = this._calculateValue(event);

    this._model.slide(value);
  }

  _calculateValue(event) {
    const { vertical, min, max } = this._model.getConfig();

    const point = this._getPointCoord(event);
    const sliderSizeInPx = this._getSliderSizeInPx();
    const k = vertical
      ? 1 - point / (sliderSizeInPx - 1)
      : point / (sliderSizeInPx - 1);
    const value = min + (max - min) * k;

    return value;
  }

  _getPointCoord(event) {
    const { vertical } = this._model.getConfig();
    const { sliderView } = this._views;

    const pointCoordX = event.pageX - sliderView.getRoot().offset().left;
    const pointCoordY = event.pageY - sliderView.getRoot().offset().top;

    return vertical ? pointCoordY : pointCoordX;
  }

  _getSliderSizeInPx() {
    const { vertical } = this._model.getConfig();
    const { sliderView } = this._views;

    return vertical ? sliderView.getRoot().height() : sliderView.getRoot().width();
  }

  _handleWindowMouseUp() {
    this._model.finishSlide();
  }

  _handleWindowResize() {
    this._updateViews();
  }

  _handleDocumentReady() {
    this._updateViews();
  }

  _updateViews() {
    const {
      sliderView,
      handleView,
      hintView,
      trackerView,
      gridView,
    } = this._views;

    const config = this._model.getConfig();

    sliderView.update(config);
    handleView.update(config);
    hintView.update(config);
    trackerView.update(config);
    gridView.update(config);
  }
}

export default Controller;
