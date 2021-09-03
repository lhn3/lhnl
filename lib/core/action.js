const {promisify} = require('util')
//让download可以使用promise函数
const download = promisify(require('download-git-repo'))
//导入打开浏览器命令
const open = require('open')
//导入仓库名
const {vueRepo} = require('../config/repo-config')
//导入终端执行命令
const {commandSpawn} = require('../utils/terminal')
//导入末班解析模块,写入文件模块
const {compile, writeFiles} = require('../utils/compileejs')
//导入路径模块
const path = require('path')


//创建项目动作
const creatAction = async (project) => {
    console.log('loading_create......')

    //1.clone项目,先下载第三方库:download-git-repo
    await download(vueRepo, project, {clone: true});//克隆的路径，所在的文件夹，是否全部克隆

    //2.执行npm install
    //npm命令，install方法，在当前目录下project文件夹下
    //window执行npm.cmd程序，Mac执行npm，需判断
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    await commandSpawn(command, ['install'], {cwd: `./${project}`})

    //3.运行npm run serve
    commandSpawn(command, ['run', 'serve'], {cwd: `./${project}`})

    //4.打开浏览器，安装第三方库open
    // open('http://localhost:8080/')
}

//创建一般组件动作
const addCpnAction = async (cpnName, filepath) => {
    console.log('loading_addcpn......')
    //1.设置对应ejs模板
    //2.编译模板,(模板,组件名称),安装ejs
    const result = await compile('vue-component.ejs', {name: cpnName, lowerName: cpnName.toLowerCase()})

    //写入文件
    const path_vue = path.resolve(filepath, `${cpnName}.vue`)
    writeFiles(path_vue, result)
}

//创建路由组件动作
const addPageAction = async (pageName, filepath) => {
    console.log('loading_addpages......')
    //1.设置对应ejs模板
    //2.编译模板,(模板,组件名称),安装ejs
    const result_vue = await compile('vue-component.ejs', {name: pageName, lowerName: pageName.toLowerCase()})
    const result_js = await compile('vue-router.ejs', {name: pageName, lowerName: pageName.toLowerCase()})

    //写入文件
    // const path_vue=path.resolve(filepath,`${pageName}/${pageName}.vue`)
    const path_vue = path.resolve(filepath, `${pageName}.vue`)
    const path_js = path.resolve(filepath, `router.js`)
    writeFiles(path_vue, result_vue)
    writeFiles(path_js, result_js)
}

//创建store组件动作
const addStoreAction = async (storeName, filepath) => {
    console.log('loading_addstore......')
    //1.设置对应ejs模板
    //2.编译模板,(模板,组件名称),安装ejs
    const result_store = await compile('vuex-store.ejs', {})
    const result_store_type = await compile('vuex-store-types.ejs', {})

    //写入文件
    const path_store = path.resolve(filepath, `${storeName.toLowerCase()}.js`)
    const path_store_type = path.resolve(filepath, 'types.js')
    writeFiles(path_store, result_store)
    writeFiles(path_store_type, result_store_type)
}


module.exports = {
    creatAction,
    addCpnAction,
    addPageAction,
    addStoreAction
}

