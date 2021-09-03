const program = require('commander')

const hOption = () => {
    //查看版本
    program.version(require("../../package.json").version,);

    //增加自己的options
    program.option('-f --find', 'a find option')
    program.option('-d --dest <dest>', 'a dest option')
    program.option('-w --why', 'a why option')

    //监听--help
    program.on('--help', () => {
        console.log('show:message')
    })
}

module.exports = {
    hOption
};