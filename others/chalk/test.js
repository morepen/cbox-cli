const toUnixPath = require('../utils/toUnixPath')
// console.log(process.env) // 查询环境变量
// console.log(process.platform) // 查询当平台关键字

console.log(process.env['USERPROFILE'])

console.log(toUnixPath(`${process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']}` + '/.tmp'))
