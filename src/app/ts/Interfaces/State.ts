import Key from '../types';

interface State {
  [index: string]: State[Key];
  min: number;
  max: number;
  step?: number;
  value?: null | number;
  value2?: null | number;
  isRange?: boolean;
  isVertical?: boolean;
  showBubble?: boolean;
  showGrid?: boolean;
  showBar?: boolean;
  gridDensity?: number;
  onCreate?: (state: this) => void;
  onChange?: (state: this) => void;
}

type UpdateValue =
  | number
  | boolean
  | ((state: State) => void)
  | ((state: State) => void)
  | null
  | undefined;

interface Events {
  type: string;
  value: UpdateValue;
}

export { Events };
export default State;
