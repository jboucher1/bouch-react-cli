import fs from 'fs-extra';
import { Component, Style, Test, UiComponent, Native } from './templates';
import { each, compact } from 'lodash';
import { join } from 'path';
import chalk from 'chalk'

const messages = {
    exists: [],
    components: [],
    services: [],
    styles: [],
    tests: []
}

export const create = async (options) => {

    let directory = options.directory ? options.directory : `src/${options.template}s`;
    let attr = options.typescript ? 'ts' : 'js';
    if(options.tsx) attr = 'tsx';
    let indexDir = `${directory}/index.${attr}`;

    await fs.pathExists(indexDir).then((exists) => {
        if (!exists && options.index) {
            return fs.outputFile(indexDir, '')
        }
    }).then(() => {
        each(compact(options.names), (name) => build(name, options, directory, attr, indexDir))
    })

    createMessage(options);
}

const createMessage = (options) => {
    console.log(messages)
}

const build = (name, options, directory, attr, indexDir) => {
    let folderName = options.folder ? name + '/' + name : name;
    let path = join(`${directory}/${folderName}.`);
    let style = options.style && options.template === 'component' ? `${options.style}` : false;

    if (pathExists(path + attr)) {
        messages.exists.push(name)
        return;
    };

    if (options.native) {
        fs.outputFile(path + attr, Native(name)).then(() => messages.components.push(name))

    } else if (options.ui) {
        fs.outputFile(path + attr, UiComponent(name, style)).then(() => messages.components.push(name))

    } else {
        fs.outputFile(path + attr, Component(name, style, options.tsx)).then(() => messages.components.push(name))
    }


    if (style) {
        fs.outputFile(path + options.style, Style(name)).then(() => messages.styles.push(name))
    }

    if (options.tests) {
        fs.outputFile(path + 'test.' + attr, Test(name, options.tsx)).then(() => messages.tests.push(name))
    }

    if (pathExists(indexDir) && options.index) {
        fs.appendFile(indexDir, '\n' + addExport(name))
    }

}

const addExport = (name) => {
    return `export * from './${name}/${name}';`;
}

const pathExists = (path) => {
    return fs.pathExistsSync(path);
}