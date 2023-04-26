export interface TableStep {
    type: 'Unary-Prefix' | 'Unary-Postfix' | 'Binary' | 'Ternary';
    operator?: string;
    variable1Name?: string;
    variable2Name?: string;
    value1?: string;
    value2?: string;
    value3?: string;
    result?: string;
}