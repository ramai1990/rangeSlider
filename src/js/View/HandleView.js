class HandleView {
  constructor(root) {
    this._$leftHandle = $('<div>').appendTo(root).addClass('range-slider__handle');
    this._$rightHandle = $('<div>').appendTo(root).addClass('range-slider__handle');
  }

  getLeftHandle() {
    return this._$leftHandle;
  }

  getRightHandle() {
    return this._$rightHandle;
  }

  update(config) {
    const { range } = config;

    if (range) {
      this._displayRightHandle();
    } else {
      this._hideRightHandle();
    }

    this._calculateHandlePosition(config);
  }

  toString() {
    return '{"class": "HandleView"}';
  }

  _displayRightHandle() {
    this._$rightHandle.removeClass('range-slider__handle_hidden');
  }

  _hideRightHandle() {
    this._$rightHandle.addClass('range-slider__handle_hidden');
  }

  _calculateHandlePosition({ min, max, from, to, vertical }) {
    const fromInPercent = min !== max
      ? (from - min) / (max - min) * 100
      : 0;
    const toInPercent = min !== max
      ? (to - min) / (max - min) * 100
      : 0;

    if (vertical) {
      this._$leftHandle.css('bottom', `${fromInPercent}%`).css('left', '');
      this._$rightHandle.css('bottom', `${toInPercent}%`).css('left', '');
    } else {
      this._$leftHandle.css('left', `${fromInPercent}%`).css('bottom', '');
      this._$rightHandle.css('left', `${toInPercent}%`).css('bottom', '');
    }
  }
}

export default HandleView;
