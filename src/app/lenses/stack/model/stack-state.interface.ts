export interface StackState {
    frames: StackFrame[];
}

export interface StackFrame {
    args: StackFrameArg[]
    functionName: string;
}

export interface StackFrameArg {
    argName: string;
    argValue: string;
}