class HintView {
  constructor(handleView) {
    this._handleView = handleView;
    this._$leftHint = $('<div>').appendTo(handleView.getLeftHandle()).addClass('range-slider__hint');
    this._$rightHint = $('<div>').appendTo(handleView.getRightHandle()).addClass('range-slider__hint');
  }

  update(config) {
    const { displayHint } = config;

    if (displayHint) {
      this._displayHints();
      this._setHintText(config);
      this._calculateHintPosition(config);
    } else {
      this._hideHints();
    }
  }

  toString() {
    return '{"class": "HintView"}';
  }

  _displayHints() {
    this._$leftHint.removeClass('range-slider__hint_hidden');
    this._$rightHint.removeClass('range-slider__hint_hidden');
  }

  _hideHints() {
    this._$leftHint.addClass('range-slider__hint_hidden');
    this._$rightHint.addClass('range-slider__hint_hidden');
  }

  _setHintText({ from, to }) {
    this._$leftHint.text(from);
    this._$rightHint.text(to);
  }

  _calculateHintPosition({ vertical, from, to }) {
    const $leftHint = this._$leftHint;
    const $rightHint = this._$rightHint;

    const $leftHandle = this._handleView.getLeftHandle();
    const $rightHandle = this._handleView.getRightHandle();

    const leftHandleTopSide = $leftHandle.offset().top;
    const leftHandleBottomSide = $leftHandle.offset().top + $leftHandle.outerHeight();
    const leftHandleLeftSide = $leftHandle.offset().left;
    const leftHandleRightSide = $leftHandle.offset().left + $leftHandle.outerWidth();

    const rightHandleTopSide = $rightHandle.offset().top;
    const rightHandleBottomSide = $rightHandle.offset().top + $rightHandle.outerHeight();
    const rightHandleLeftSide = $rightHandle.offset().left;
    const rightHandleRightSide = $rightHandle.offset().left + $rightHandle.outerWidth();

    if (vertical) {
      this._alignHintBetweenVerticalPoints($leftHint, leftHandleTopSide, leftHandleBottomSide);
      this._alignHintBetweenVerticalPoints($rightHint, rightHandleTopSide, rightHandleBottomSide);
      $leftHint.css('left', '');
      $rightHint.css('left', '');
    } else {
      this._alignHintBetweenHorizontalPoints($leftHint, leftHandleLeftSide, leftHandleRightSide);
      this._alignHintBetweenHorizontalPoints($rightHint, rightHandleLeftSide, rightHandleRightSide);
      $leftHint.css('top', '');
      $rightHint.css('top', '');
    }

    if (this._checkCollisionOfHints()) {
      $leftHint.text(`${from} — ${to}`);
      $rightHint.addClass('range-slider__hint_hidden');
      if (vertical) {
        this._alignHintBetweenVerticalPoints($leftHint, rightHandleTopSide, leftHandleBottomSide);
      } else {
        this._alignHintBetweenHorizontalPoints($leftHint, leftHandleLeftSide, rightHandleRightSide);
      }
    }
  }

  _alignHintBetweenHorizontalPoints($hint, point1, point2) {
    let left = point1 - ($hint.outerWidth() - point2 + point1) / 2;
    left = this._getOffsetLeftWithoutFallingOutOfDocument(left, $hint.outerWidth());
    $hint.offset({ left });
  }

  _alignHintBetweenVerticalPoints($hint, point1, point2) {
    let top = point1 - ($hint.outerHeight() - point2 + point1) / 2;
    top = this._getOffsetTopWithoutFallingOutOfDocument(top, $hint.outerHeight());
    $hint.offset({ top });
  }

  _getOffsetLeftWithoutFallingOutOfDocument(left, width) {
    const htmlWidth = $('html').width();
    const maybeLeftGreaterThanHtmlWidth = left + width > htmlWidth
      ? htmlWidth - width
      : left;
    const newLeft = left < 0 ? 0 : maybeLeftGreaterThanHtmlWidth;

    return newLeft;
  }

  _getOffsetTopWithoutFallingOutOfDocument(top) {
    return top < 0 ? 0 : top;
  }

  _checkCollisionOfHints() {
    const $leftHint = this._$leftHint;
    const $rightHint = this._$rightHint;

    if ($leftHint.css('visibility') === 'hidden' || $rightHint.css('visibility') === 'hidden') {
      return false;
    }

    const leftHintProjectionX = {
      left: $leftHint.offset().left,
      right: $leftHint.offset().left + $leftHint.outerWidth(),
    };

    const rightHintProjectionX = {
      left: $rightHint.offset().left,
      right: $rightHint.offset().left + $rightHint.outerWidth(),
    };

    const isCollisionX = !(
      (leftHintProjectionX.left <= rightHintProjectionX.left
      && leftHintProjectionX.right <= rightHintProjectionX.left)
      || (leftHintProjectionX.left >= rightHintProjectionX.right
      && leftHintProjectionX.right >= rightHintProjectionX.right)
    );

    const leftHintProjectionY = {
      top: $leftHint.offset().top,
      bottom: $leftHint.offset().top + $leftHint.outerHeight(),
    };

    const rightHintProjectionY = {
      top: $rightHint.offset().top,
      bottom: $rightHint.offset().top + $rightHint.outerHeight(),
    };

    const isCollisionY = !(
      (leftHintProjectionY.top <= rightHintProjectionY.top
      && leftHintProjectionY.bottom <= rightHintProjectionY.top)
      || (leftHintProjectionY.top >= rightHintProjectionY.bottom
      && leftHintProjectionY.bottom >= rightHintProjectionY.bottom)
    );

    return isCollisionX && isCollisionY;
  }
}

export default HintView;
