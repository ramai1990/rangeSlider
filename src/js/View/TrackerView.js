class TrackerView {
  constructor(root) {
    this._$tracker = $('<div>').appendTo(root).addClass('range-slider__tracker');
  }

  update(config) {
    const { displayTracker } = config;

    if (displayTracker) {
      this._displayTracker();
      this._calculateTrackerSize(config);
      this._calculateTrackerPosition(config);
    } else {
      this._hideTracker();
    }
  }

  toString() {
    return '{"class": "TrackerView"}';
  }

  _displayTracker() {
    this._$tracker.removeClass('range-slider__tracker_hidden');
  }

  _hideTracker() {
    this._$tracker.addClass('range-slider__tracker_hidden');
  }

  _calculateTrackerSize({ min, max, from, to, range, vertical }) {
    const fromInPercent = min !== max
      ? (from - min) / (max - min) * 100
      : 0;
    const toInPercent = min !== max
      ? (to - min) / (max - min) * 100
      : 0;
    const trackerSizeInPercent = range
      ? toInPercent - fromInPercent
      : fromInPercent;

    if (vertical) {
      this._$tracker.css('height', `${trackerSizeInPercent}%`).css('width', '');
    } else {
      this._$tracker.css('width', `${trackerSizeInPercent}%`).css('height', '');
    }
  }

  _calculateTrackerPosition({ min, max, from, range, vertical }) {
    const fromInPercent = (from - min) / (max - min) * 100;
    const trackerOffsetInPercent = range ? fromInPercent : 0;

    if (vertical) {
      this._$tracker.css('bottom', `${trackerOffsetInPercent}%`).css('left', '');
    } else {
      this._$tracker.css('left', `${trackerOffsetInPercent}%`).css('bottom', '');
    }
  }
}

export default TrackerView;
