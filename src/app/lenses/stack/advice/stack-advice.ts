import { StackArg, StackCommandType } from "../model/stack-command.interface";
import { state } from "../state/stack-command-state";

export const StackAdvice = {
    apply: (f, t, xs, serial) => {
        const node = state.aran.nodes[serial];
        const line = node.loc.start.line;
        const col = node.loc.start.column;
        const endLine = node.loc.end.line;;
        const endCol = node.loc.end.column;
        const nodeArgs = node.arguments;
        const stackArgs: StackArg[] = []; 
        for (let i = 0; i < nodeArgs.length; i++) {
            if (nodeArgs[i].type === "BinaryExpression" && nodeArgs[i].left && nodeArgs[i].left.name) {
                stackArgs.push({ argName: nodeArgs[i].left.name, argValue: `${xs[i]}`} );
            }
        }
        state.commands.push( { command: StackCommandType.ADD_FRAME, line, col, endLine, endCol, functionName: f.name, args: stackArgs });
        const x = Reflect.apply(f, t, xs);
        state.commands.push({ command: StackCommandType.POP_FRAME, line, col, endLine, endCol, functionName: f.name, args: stackArgs});
        return x;
      }
}