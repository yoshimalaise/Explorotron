export interface VariableState {
    depth: string;
    variableEvents: VariableEvent[];
    aran: any;
}

export interface VariableEvent {
    eventType: VARIABLE_EVENT_TYPE;
    line: number;
    col: number;
    varName: string;
    value: any;
}

export enum VARIABLE_EVENT_TYPE {
    READ = "Read",
    UPDATE = "Update"
}