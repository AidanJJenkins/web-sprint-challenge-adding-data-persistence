// build your `Task` model here
const db = require('../../data/dbConfig')

module.exports = {
    get,
    create
}

async function get() {
  const result = await db("tasks as t")
    .select("t.*", "p.project_description", "p.project_name")
    .join("projects as p", "p.project_id", "=", "t.project_id");
  return result.map((val) => {
    return {
      task_id: val.task_id,
      task_description: val.task_description,
      task_notes: val.task_notes,
      task_completed: val.task_completed ? true : false,
      project_id: val.project_id,
      project_name: val.project_name,
      project_description: val.project_description,
    };
  });
}

async function checkProjectId(projectId) {
  const [result] = await db('projects').where('project_id', projectId).limit(1)
  return !!result 
}

async function create(task) {
  const { project_id } = task

  const isValidId = await checkProjectId(project_id)
  if (!isValidId) {
      const error = new Error('Invalid project_id')
      error.statusCode = 409
      throw error
  }

  const [id] = await db('tasks').insert(task)
  const [result] = await db('tasks').where('task_id', id)
  return {
    task_id: result.task_id,
    task_description: result.task_description,
    task_notes: result.task_notes,
    task_completed: result.task_completed ? true : false,
    project_id: result.project_id,
  }
}

