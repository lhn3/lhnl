#!/usr/bin/env node

const program = require('commander')
const {hOption} = require('./lib/core/help')
const {createCommands} = require('./lib/core/create')

//调用自定义option
hOption()

//调用克隆仓库命令
createCommands()

//提交自定义的内容,一定要放在所有自定义命令最后！！！！！
program.parse(program.argv)

console.log('命令执行中......')


//lhnl -V/--version
//lhnl -h/--help
//lhnl -f/--find
//lhnl -w/--why <dest>
//lhnl create dome  #创建一个vue项目
//lhnl addcpn Home  #创建一个一般组件
//lhnl addpage dome  #创建一个路由组件
//lhnl addstore dome  #创建一个store
