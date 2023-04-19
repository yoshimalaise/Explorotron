export interface ExtensionCommand {
    command: CommandType;
    sourceCode?: string;
}

export enum CommandType {
    LOAD_PLUGIN = "LoadPlugin"
}