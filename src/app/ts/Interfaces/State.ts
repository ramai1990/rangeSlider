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
interface IsRange {
  type: 'isRange';
  payload: boolean | undefined;
}
interface IsVertical {
  type: 'isVertical';
  payload: boolean | undefined;
}
interface ShowBubble {
  type: 'showBubble';
  payload: boolean | undefined;
}
interface ShowGrid {
  type: 'showGrid';
  payload: boolean | undefined;
}
interface ShowBar {
  type: 'showBar';
  payload: boolean | undefined;
}
interface OnCreate {
  type: 'onCreate';
  payload: (state: this) => void | undefined;
}
interface OnChange {
  type: 'onChange';
  payload: (state: this) => void | undefined;
}

type ModelEvents = Min | Max | Step | Value | Value2 | GridDensity;
type ViewEvents =
  | Min
  | Max
  | Step
  | Value
  | Value2
  | GridDensity
  | IsRange
  | IsVertical
  | ShowBubble
  | ShowGrid
  | ShowBar
  | OnCreate
  | OnChange;

export { ModelEvents, ViewEvents };
export default State;
