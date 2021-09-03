//导入解析ejs文件模块
const ejs = require('ejs')
//导入路径模块
const path = require('path')
// 导入文件操作模块
const fs = require('fs')

//解析模板
const compile = (ejs_name, data) => {
    const temp = `../templates/${ejs_name}`
    //拼接传来的ejs模板路径
    const templatePath = path.resolve(__dirname, temp)
    //传入模板路径和所需参数
    return new Promise((resolve, reject) => {
        //{data}向模板中这样传入数据，才可以取到值
        ejs.renderFile(templatePath, {data}, (err, result) => {
            if (err) {
                console.log(err)
                return;
            }
            //成功返回回调内容
            resolve(result)
        })
    })
}


//写入文件
const writeFiles = (pathname, content) => {
    return fs.promises.writeFile(pathname, content)
}


module.exports = {
    compile,
    writeFiles
}