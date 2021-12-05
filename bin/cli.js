#! /usr/bin/env node
const {program}=require('commander')
// console.log(process.argv)

const helpOption=require('../lib/core/help.js')

const myAction=require('../lib/core/myAction.js')



helpOption(program);

myAction(program);



program.version(require('../package.json').version).parse(process.argv)