import * as fs from 'fs';
import { generateQuestions } from './questions-generator';
const qs = require('../libs/sqjs');

export function analyse(filepath: string) {
    const code = fs.readFileSync(filepath, {encoding:'utf8', flag:'r'});
    const questions = generateQuestions(code);
    console.log(questions);
}