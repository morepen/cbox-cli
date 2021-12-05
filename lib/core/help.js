const helpOption=function(program){
	program.option('-f --framework<framework>','select your framework')
	program.option('-d --dest<dest>','a destination folder')
	const examples={
		cerate:['cbox create|ctr<project>'],
		config:[
			'cbox config|cfg set<k><v>',
			'cbox config|cfg get<k>'
		]
	}
	program.on('--help',()=>{
		console.log('Examples: ')
		Object.keys(examples).forEach((actionName)=>{
			examples[actionName].forEach((item)=>{
				console.log("  "+item)
			})
		})
	})
}
module.exports=helpOption;
