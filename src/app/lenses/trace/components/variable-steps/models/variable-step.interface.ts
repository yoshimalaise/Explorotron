export interface VariableStep {
    selected: boolean;
    line?: number;
    name?: string;
    action?: 'declare' | 'declare, init' | 'read' | 'assign';
    value?: number; 
}