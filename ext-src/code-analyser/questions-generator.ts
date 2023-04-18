const qs = require('../libs/sqjs');

export function generateQuestions(code: string) {
    const qlcs = qs.generate(code, [
        { count: 2, types: ['FunctionName', 'ParameterName'] },
        { count: 3, fill: true, uniqueTypes: true }
      ]);
      
    return qlcs;
}