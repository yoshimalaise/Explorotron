export interface VariableState {
    depth: string;
    variableEvents: VariableEvent[];
}

export interface VariableEvent {
    line: number;
    col: number;
    varName: string;
    value: any;
}