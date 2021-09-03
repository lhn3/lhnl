const program = require('commander')
//导入创建的动作
const {creatAction,addCpnAction,addPageAction,addStoreAction}=require("./action")


const createCommands = () => {
    //创建vue项目指令
    program
        //命令行的参数
        .command('create <project> [...others]') //project项目名，[other...]传递的参数
        //描述
        .description('description info:clone a object')
        //执行命令后调用的函数
        .action(
        //回调函数，单独封装
        //     (project,others) => {
        //     //>lhnl create dome aaa bbb
        //     //打印:dome ['aaa','bbb']
        //     console.log(project,others)
        // }
            creatAction
        )

    //创建一般组件指令
    program
        //lhnl addcpn Home -d 路径位置(默认src/components/)
        .command('addcpn <cpnName>')
        .description('description info:add a vue component')
        .action((cpnName)=>{
                addCpnAction(cpnName,program.dest || 'demo/src/components')
            }
        )

    //创建路由组件指令
    program
        //lhnl addpage Home -d 路径位置
        .command('addpage <pageName>')
        .description('description info:add a vue pages')
        .action((pageName)=>{
            addPageAction(pageName,program.dest || 'demo/src/pages')
            }
        )

    //创建store组件指令
    program
        //lhnl addstore Home -d 路径位置
        .command('addstore <storeName>')
        .description('description info:add a vue store')
        .action((storeName)=>{
            addStoreAction(storeName,program.dest || 'demo/src/store/modules')
            }
        )
}

module.exports = {
    createCommands
};
