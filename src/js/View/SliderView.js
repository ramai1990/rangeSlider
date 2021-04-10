class SliderView {
  constructor(root) {
    this._$root = $(root).addClass('range-slider');
  }

  getRoot() {
    return this._$root;
  }

  update(config) {
    const { vertical } = config;

    if (vertical) {
      this._setToVertical();
    } else {
      this._setToHorizontal();
    }
  }

  toString() {
    return '{"class": "SliderView"}';
  }

  _setToVertical() {
    this._$root.addClass('range-slider_vertical');
  }

  _setToHorizontal() {
    this._$root.removeClass('range-slider_vertical');
  }
}

export default SliderView;
