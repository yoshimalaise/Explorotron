import { state } from "../state/state";
import { VARIABLE_ADVICE } from "./variables.advice";

export const ADVICE = {
  apply: (f, t, xs, serial) => {
    console.log(state.depth + f.name + "(" + xs.join(", ") + ")");
    state.depth += ".";
    const x = Reflect.apply(f, t, xs);
    state.depth = state.depth.substring(1);
    console.log(state.depth + x);
    return x;
  },
  ...VARIABLE_ADVICE
}