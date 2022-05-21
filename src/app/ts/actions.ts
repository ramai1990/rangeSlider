import { ModelEvents } from './Interfaces/State';

export const updateMin = (payload: number): ModelEvents => ({
  type: 'min',
  payload,
});

export const updateMax = (payload: number): ModelEvents => ({
  type: 'max',
  payload,
});

export const updateStep = (payload: number): ModelEvents => ({
  type: 'step',
  payload,
});

export const updateValue = (payload: number|null): ModelEvents => ({
  type: 'value',
  payload,
});

export const updateValue2 = (payload: number|null): ModelEvents => ({
  type: 'value2',
  payload,
});

export const updateGridDensity = (payload: number): ModelEvents => ({
  type: 'gridDensity',
  payload,
});
