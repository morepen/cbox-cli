const ora = require('ora')
const path = require('path')
const { promisify } = require('util')
const toUnixPath = require('../../utils/toUnixPath.js')
const axios = require('axios')
const inquirer = require('inquirer')
let downloadFn = require('download-git-repo')
downloadFn = promisify(downloadFn)
downloadFn = promisify(downloadFn)
const ncp = require('ncp')

//! 工具方法之查询模板信息
const fetchInfo = async function (repoName, tmpName) {
  //? 定义token
  const token = "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"
  const url1 = `https://api.github.com/users/${repoName}/repos`
  const url2 = `https://api.github.com/repos/${repoName}/${tmpName}/tags`
  const headers = { "Authorization": "token " + token }
  const url = !tmpName ? url1 : url2
  let { data } = await axios({
    method: 'get',
    url: url,
    headers: headers
  })
  return data.map(item => item.name)
}

//! 工具方法之添加耗时
const addLoading = function (fn) {
  return async function (...args) {
    const spinner = ora('正在查询').start()
    const ret = await fn(...args)
    spinner.succeed('查询成功')
    return ret
  }
}

//! 工具方法之下载操作
const downLoadRepo = async function (repo, tag) {
  //? 定义缓存路径
  const cacheDir = toUnixPath(`${process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']}` + '/.tmp')
  //? 处理参数
  let api = `morepen/${repo}`
  if (tag) api += `#/${tag}`
  //? 定义缓存目录
  const dest = tag ? path.resolve(cacheDir, repo, tag) : path.resolve(cacheDir, repo)
  //? 执行下载操作
  
  const spinner = ora('正在下载......').start()
  console.log(api);
  await downloadFn(api, dest)
  spinner.succeed('下载成功')
}

const createActions = async function (project) {
 
  const repos = await addLoading(fetchInfo)('morepen')
  console.log(repos);
  //? 01 准备问题
  const quesList = [
    {
      type: 'list',
      name: 'tmpRepo',
      message: '选择目标模板',
      choices: repos
    }
  ]
  //? 02 处理问题
  const { tmpRepo } = await inquirer.prompt(quesList)

  //? 03 查询选中模板信息
  const tags = await addLoading(fetchInfo)('morepen', tmpRepo)

  //? 04 处理下载URL
  let loadUrl = null
  if (tags.length) {
    // 处理版本
    const quesTag = [
      {
        type: 'list',
        name: 'tmpTag',
        message: '选择指定版本',
        choices: tags
      }
    ]
    const { tmpTag } = await inquirer.prompt(quesTag)
	console.log(tmpTag);
  } else {
    console.log('直接执行下载')
    downLoadRepo(tmpRepo)
  }
  if (fs.existsSync(path.join(destDir, 'que.js'))) {
      console.log('需要渲染数据')
    } else {
      // 此时直接将下载好的内容拷贝过来完成项目的创建
      ncp(destDir, project)
    }
}
module.exports =createActions
