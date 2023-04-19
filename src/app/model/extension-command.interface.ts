import { LenseIds } from "./lense-ids.enum";

export interface ExtensionCommand {
    command: CommandType;
    sourceCode?: string;
    lenseId?: LenseIds;
}

export enum CommandType {
    LOAD_PLUGIN = "LoadPlugin"
}