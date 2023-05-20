// build your `Project` model here
const db = require('../../data/dbConfig')

module.exports = {
    get,
    findById,
    create
}

async function get() {
  const projects = await db('projects')
  projects.map((i) => {
    if (i.project_completed == 0){
      i.project_completed = false
    } else if (i.project_completed == 1){
      i.project_completed = true
    }
  })
  return projects
}

async function findById(id) {
  return db('projects').where('project_id', id).first()
}

async function create(project) {
  try {
    const proj = await db('projects').insert(project)
    const id = proj[0];
    const result = await findById(id)
    console.log(result)
    if (result.project_completed == 0){
      result.project_completed = false
      return result
    } else if (result.project_completed == 1){
      result.project_completed = true
      return result
    }
  } catch (err) {
    console.log(err)
  }
}

