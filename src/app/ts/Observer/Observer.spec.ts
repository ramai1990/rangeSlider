import State from '../Interfaces/State';
import Observer from './Observer';

describe('Observer', () => {
  it('реализует подписку на события и оповещение', () => {
    const observer = new Observer();

    let counter = 0;
    const callback = (): void => {
      counter += 1;
    };

    observer.on('some.event', callback);

    expect(counter).toEqual(0);

    observer.trigger('some.event', 1);

    expect(counter).toEqual(1);
  });

  it('передаваемые данные', () => {
    const observer = new Observer();

    let counter = 0;
    const callback = (delta: number | State | undefined): void => {
      if (typeof delta !== 'undefined' && typeof delta === 'number') {
        counter += delta;
      }
    };

    observer.on('some.event', callback);

    expect(counter).toEqual(0);

    observer.trigger('some.event', 42);

    expect(counter).toEqual(42);
  });
});
