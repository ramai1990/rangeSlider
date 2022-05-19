import Key from '../types';

interface State {
  [index: string]: State[Key];
  min: number;
  max: number;
  step: number;
  value: number;
  value2: null | number;
  isRange?: boolean;
  isVertical?: boolean;
  showBubble?: boolean;
  showGrid?: boolean;
  showBar?: boolean;
  gridDensity: number;
  onCreate?: (state: this) => void;
  onChange?: (state: this) => void;
}

interface Min {
  type: 'min';
  payload: number;
}
interface Max {
  type: 'max';
  payload: number;
}
interface Step {
  type: 'step';
  payload: number;
}
interface Value {
  type: 'value';
  payload: number | null;
}
interface Value2 {
  type: 'value2';
  payload: number | null;
}
interface GridDensity {
  type: 'gridDensity';
  payload: number;
}

type Events = Min | Max | Step | Value | Value2 | GridDensity;

export { Events };
export default State;
