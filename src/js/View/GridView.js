class GridView {
  constructor(root) {
    this._$grid = $('<div>').appendTo(root).addClass('range-slider__grid');
  }

  update(config) {
    const { displayGrid } = config;

    if (displayGrid) {
      this._displayGrid();
      this._updateGrid(config);
    } else {
      this._hideGrid();
    }
  }

  toString() {
    return '{"class": "GridView"}';
  }

  _displayGrid() {
    this._$grid.removeClass('range-slider__grid_hidden');
  }

  _hideGrid() {
    this._$grid.addClass('range-slider__grid_hidden');
  }

  _updateGrid({ min, max, gridStep, vertical }) {
    this._$grid.empty();

    for (let i = min; i < max; i += gridStep) {
      const gridMarkLeftOffsetInPercent = (i - min) / (max - min) * 100;
      const gridDirection = vertical ? 'bottom' : 'left';
      this._addGridMark(i, gridMarkLeftOffsetInPercent, gridDirection);

      if (i + gridStep >= max) {
        this._addGridMark(max, 100, gridDirection);
      }
    }
  }

  _addGridMark(value, offset, direction) {
    $('<div>')
      .appendTo(this._$grid)
      .addClass('range-slider__grid-mark')
      .text(value)
      .css(direction, `${offset}%`);
  }
}

export default GridView;
