import inquirer from 'inquirer';
import { create } from './create';
import { Names } from './templates';


export const validate = async (options) => {
  await validateOptions(options);
  create(options);
}

export const validateOptions = async (options) => {

  const questions = [];

  if (options.native == undefined) {
    questions.push({
      type: 'list',
      name: 'native',
      message: 'Is the application',
      choices: ['Native', 'Web']
    });
  }

  if (Names.indexOf(options.template) == -1) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please select a template',
      choices: Names,
      default: 'component',
    });
  }

  if (!options.names.length) {
    questions.push({
      type: 'input',
      name: 'names',
      message: `Name your feature!, you may create multiple by adding a comma with no spaces i.e "Menu,Checkbox"\nName(s):`,
      validate: function (value) {
        let error_message = `You can only add name(s) in this format 'Menu,CheckBox or Menu'`;

        if (value.length === 0) return error_message;
        if (value.match('^[a-zA-Z,_]*$')) return true;

        return error_message
      }
    })
  }

  if (options.style == undefined) {
    questions.push({
      type: 'list',
      name: 'style',
      message: 'Please select a style',
      choices: ['css', 'scss', 'NO STYLE NEEDED']
    });
  }

  if (options.tests == undefined) {
    questions.push({
      type: 'list',
      name: 'tests',
      message: 'Do you need tests?',
      choices: ['Yes', 'No']
    });
  }

  if (!options.typescript && !options.tsx) {
    questions.push({
      type: 'list',
      name: 'language',
      message: 'Please select a language',
      choices: ['ts', 'tsx', 'js']
    });
  }


  const answers = await inquirer.prompt(questions);

  if(answers.style == 'NO STYLE NEEDED'){
    answers.style = false;
  }
  options.tsx = answers.language == 'tsx';
  options.typescript = answers.language == 'ts';
  options.template = answers.template || options.template;
  options.names = options.names.length ? options.names : answers.names.split(',');
  options.style = options.style !== undefined ? options.style : answers.style;
  options.tests = options.tests !== undefined ? options.tests :  options.tests === 'Yes' ;
  options.native = options.native !== undefined ? options.native : answers.native === 'Native';

  return options;
}