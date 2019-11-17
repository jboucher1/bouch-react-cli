import arg from 'arg';
import { validate } from './validation';

import { compact } from 'lodash';
const parseArgumentsIntoOptions = (rawArgs) =>{
    const args = arg(
        {
            '--typescript': Boolean,
            '--ts': '--typescript',
            '--directory': String,
            '--d': '--directory',
            '--no-folder': Boolean,
            '--no-tests': Boolean,
            '--no-style': Boolean,
            '--style': String,

        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        typescript: args['--typescript'] || false,
        template: args._[0],
        directory: args['--directory'],
        names: compact(args._[1] ? args._[1].split(",") : []),
        folder: !args['--no-folder'],
        style: args['--no-style'] ? false : (args['--style'] || 'css'),
        tests: !args['--no-tests']
 };
}


export function cli(args) {
    let options = parseArgumentsIntoOptions(args); 
    console.log(options)   
    validate(options);
}