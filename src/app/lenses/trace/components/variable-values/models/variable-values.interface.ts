export interface VariableValues {
    name: String;
    values: ValueEntry[];

    // hacky workaround
    newLineNumber?: number;
    newLineValue?: string;
}

export interface ValueEntry {
    lineNumber: number;
    value: string;
}