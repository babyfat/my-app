const Promise = require('bluebird')
const AppDAO = require('./dao')
const ProjectRepository = require('./project_repository')

function main() {
    const dao = new AppDAO('./database.sqlite3')
    console.info(dao)
    const projectRepo = new ProjectRepository(dao)

    projectRepo.createTable().then(data=>{
        console.log('成功')
    })
}

main()