import fs from 'fs-extra';
import { Templates } from './templates';
import { each } from 'lodash';
import { join } from 'path';
import chalk from 'chalk'



export const create = (options) => {
    
    each(options.names, (name) => build(name, options));
}

const build = (name, options) =>{
    let directory = options.directory ? options.directory : `src/${options.template}s`;
    let folderName = options.folder ? name + '/' + name : name;
    let attr = options.typescript ? 'ts': 'js'
    let path = join(`${directory}/${folderName}.`);


    if(pathExists(path + attr)){

        console.error(`'${name}' ${options.template}` ,chalk.red.bold('was not created as it already exists!'))
        return;
    }

    fs.outputFile(path + attr, Templates.Component(name)).then(() => console.log(path + attr, chalk.green.bold(`your '${name}' ${options.template} was created Successfully!`)))

    if(options.style && options.template === 'component'){

        fs.outputFile(path + options.style, Templates.Style(name)).then(() => console.log(path + options.style, chalk.green.bold(`your '${name}' ${options.style} stylesheet was created Successfully!`)))
    }

    if(options.tests){
        fs.outputFile(path + 'test.' + attr, Templates.Test(name)).then(() => console.log(path + 'test.' + attr, chalk.green.bold(`your '${name}' test file was created Successfully!`)))
    }
}

const pathExists = (path) => {
    return fs.pathExistsSync(path);
}