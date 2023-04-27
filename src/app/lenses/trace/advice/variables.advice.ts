import { VARIABLE_EVENT_TYPE } from "../model/variable-event.interface";
import { state } from "../state/state";

state
const nativeConsole = console;
export const VARIABLE_ADVICE = {
    read: (value, variable, serial) => {
        try {
            // because aran encodes generated variables as number strings
            if (!isNaN(variable)) {
                return value;
            }

            if (`${value}`.includes('function callee() {')) {
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
        } catch (err: any) {
            console.log("error using weave read advice", err);
            return value;
        }

    },
    write: (value, variable, serial) => {
        try {
            // because aran encodes generated variables as number strings
            if (!isNaN(variable)) {
                return value;
            }
            if (`${value}`.includes('function callee() {')) {
                return value;
            }
            const node = state.aran.nodes[serial];
            const line = node.loc.start.line;
            const col = node.loc.start.column;

            const baseEvent = {
                line,
                col,
                varName: variable,
                value,

            }
            if (node.type === 'VariableDeclaration' || node.type === 'VariableDeclarator') {
                state.variableEvents.push({ ...baseEvent, eventType: VARIABLE_EVENT_TYPE.DECLARE_INIT });
            } else {
                state.variableEvents.push({ ...baseEvent, eventType: VARIABLE_EVENT_TYPE.ASSIGN });
            }
            return value;
        } catch (err: any) {
            console.log("error using weave write advice", err);
            return value;
        }
    },
    enter: (tag, labels, variables, serial) => {

    }
};