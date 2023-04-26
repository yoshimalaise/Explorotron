export interface VariableValues {
    name: String;
    values: ValueEntry[];
}

export interface ValueEntry {
    lineNumber: number;
    value: string;
}