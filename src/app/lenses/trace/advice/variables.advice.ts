import { VARIABLE_EVENT_TYPE } from "../model/variable-event.interface";
import { state } from "../state/state";

state
const nativeConsole = console;
export const VARIABLE_ADVICE = {
    read: (value, variable, serial) => {
        // because aran encodes generated variables as number strings
        if (!isNaN(variable)) {
            return value;
        }
        const node = state.aran.nodes[serial];
        const line = node.loc.start.line;
        const col = node.loc.start.column;
    
        state.variableEvents.push({
            line,
            col,
            varName: variable,
            value,
            eventType: VARIABLE_EVENT_TYPE.READ
        });
        return value;
    },
    write: (value, variable, serial) => {
        // because aran encodes generated variables as number strings
        if (!isNaN(variable)) {
            return value;
        }
        const node = state.aran.nodes[serial];
        const line = node.loc.start.line;
        const col = node.loc.start.column;
    
        state.variableEvents.push({
            line,
            col,
            varName: variable,
            value,
            eventType: VARIABLE_EVENT_TYPE.UPDATE
        });
        return value;
    },
    enter: (tag, labels, variables, serial) => {

    }
};