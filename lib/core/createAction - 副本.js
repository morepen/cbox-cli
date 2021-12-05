const axios = require('axios')
const inquirer = require('inquirer')

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

const createActions = async function (project) {
  //? 定义请求头信息
    const headers = { "Authorization": "token " + "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" }
  
    var { data } = await axios({
      method: 'get',
      url: 'https://api.github.com/users/morepen/repos',
      headers: headers
    })
	const repos = data.map(item => item.name)
	
	  //? 01准备问题
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
	  var { data } = await axios({
	    method: 'get',
	    url: 'https://api.github.com/repos/zcegg/create-nm/tags',
	    headers: headers
	  })
	
	  const tags = data.map(item => item.name)
	  console.log(tags, '<----')
}
module.exports =createActions
