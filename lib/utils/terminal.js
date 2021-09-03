//执行终端命令的代码

//导入进程模块
const {spawn}=require('child_process')

const commandSpawn=(...args)=>{
    return new Promise((resolve,reject)=>{
        //执行终端命令的进程
        const childProcess=spawn(...args);
        //输出流(stdout)，执行进程的所有输出放到当前进程(process)中，用户可直接看到
        childProcess.stdout.pipe(process.stdout)
        //报错也添加到当前进程
        childProcess.stderr.pipe(process.stderr)
        //监听执行完毕
        childProcess.on('close',()=>{
            resolve()
        })
    })
}

module.exports={
    commandSpawn
}