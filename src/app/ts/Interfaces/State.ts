import Key from '../types';

interface State {
  [index: string]: State[Key];
  min?: number;
  max?: number;
  step?: number;
  value?: null|number;
  value2?: null|number;
  isRange?: boolean;
  isVertical?: boolean;
  showBubble?: boolean;
  showGrid?: boolean;
  showBar?: boolean;
  gridDensity?: number;
  onCreate?: (state: this) => void;
  onChange?: (state: this) => void;
}

export default State;
