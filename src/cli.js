import arg from 'arg';
import { validate } from './validation';
import { compact } from 'lodash';

const parseArgumentsIntoOptions = (rawArgs) => {
    const args = arg(
        {   '--native': Boolean,
            '--tsx': Boolean,
            '--typescript': Boolean,
            '--ts': '--typescript',
            '--directory': String,
            '--d': '--directory',
            '--no-folder': Boolean,
            '--no-tests': Boolean,
            '--no-style': Boolean,
            '--style': String,
            '--no-index': Boolean,
            '--ui': Boolean
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        tsx: args['--typescript'] || false, 
        typescript: args['--typescript'] || false,
        template: args._[0],
        directory: args['--directory'],
        names: compact(args._[1] ? args._[1].split(",") : []),
        folder: !args['--no-folder'],
        style: args['--no-style'] ? false : (args['--style']),
        tests: args['--no-tests'],
        index: !args['--no-index'],
        ui: args['--ui'] || false,
        native: args['--native']
    };
}


export function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    validate(options);
}