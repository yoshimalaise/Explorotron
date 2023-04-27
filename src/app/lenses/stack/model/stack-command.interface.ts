export interface StackCommandState {
    commands: StackCommand[];
    aran?: any;
}

export interface StackCommand {
    command: StackCommandType,
    functionName?: string;
    args?: StackArg[];
    line: number;
    col: number;
}

export interface StackArg {
    argName: string;
    argValue: string;
}

export enum StackCommandType {
    ADD_FRAME = "ADD_FRAME",
    POP_FRAME = 'POP_FRAME'
}