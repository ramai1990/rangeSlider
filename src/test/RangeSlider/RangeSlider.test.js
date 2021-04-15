import RangeSlider from '../../js/RangeSlider/RangeSlider';

describe('RangeSlider', () => {
  describe('constructor', () => {
    it('должен быть функцией', () => {
      expect(typeof RangeSlider).toEqual('function');
    });
  });

  describe('slide', () => {
    it('должен один раз вызвать из модели методы startSlide, slide и finishSlide', () => {
      const fakeModel = {
        slide() {},
        startSlide() {},
        finishSlide() {},
      };
      const slide = spyOn(fakeModel, 'slide');
      const startSlide = spyOn(fakeModel, 'startSlide');
      const finishSlide = spyOn(fakeModel, 'finishSlide');
      const rangeSlider = new RangeSlider(fakeModel);

      rangeSlider.slide('from', 0);
      expect(slide).toHaveBeenCalledTimes(1);
      expect(startSlide).toHaveBeenCalledTimes(1);
      expect(finishSlide).toHaveBeenCalledTimes(1);
      expect(slide).toHaveBeenCalledWith(0);
      expect(startSlide).toHaveBeenCalledWith('from');

      slide.calls.reset();
      startSlide.calls.reset();
      finishSlide.calls.reset();

      rangeSlider.slide('to', 1);
      expect(slide).toHaveBeenCalledTimes(1);
      expect(startSlide).toHaveBeenCalledTimes(1);
      expect(finishSlide).toHaveBeenCalledTimes(1);
      expect(slide).toHaveBeenCalledWith(1);
      expect(startSlide).toHaveBeenCalledWith('to');
    });
  });

  describe('update', () => {
    it('должен один раз вызвать из модели метод update', () => {
      const fakeModel = { update() {} };
      const update = spyOn(fakeModel, 'update');
      const rangeSlider = new RangeSlider(fakeModel);

      rangeSlider.update({});
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith({});

      update.calls.reset();

      rangeSlider.update({ a: 1 });
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith({ a: 1 });
    });
  });

  describe('reset', () => {
    it('должен один раз вызвать из модели метод reset', () => {
      const fakeModel = { reset() {} };
      const reset = spyOn(fakeModel, 'reset');
      const rangeSlider = new RangeSlider(fakeModel);
      rangeSlider.reset();
      expect(reset).toHaveBeenCalledTimes(1);
    });
  });
});
