const nativeConsole = console;
export const VARIABLE_ADVICE = {
    read: (value, variable, serial) => {
        // because aran encodes generated variables as number strings
        if (!isNaN(variable)) {
            return value;
        }
        console.log(value, variable, serial)
        console.log(`Reading ${variable} value: ${value}`);
        return value;
    },
    write: (value, variable, serial) => {
        console.log("writing a var");
        return value;
    },
    enter: (tag, labels, variables, serial) => {

    }
};