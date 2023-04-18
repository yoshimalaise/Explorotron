import * as fs from 'fs';

export function analyse(filepath: string) {
    const code = fs.readFileSync(filepath, {encoding:'utf8', flag:'r'});
    console.log('we are in the analyser');
    console.log(code);
}