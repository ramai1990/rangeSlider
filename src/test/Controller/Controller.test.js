import Controller from '../../js/Controller/Controller';

describe('Controller', () => {
  describe('constructor', () => {
    it('должен быть функцией', () => {
      expect(typeof Controller).toEqual('function');
    });
  });
});
