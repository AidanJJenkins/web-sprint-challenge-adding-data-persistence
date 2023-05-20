// build your `/api/tasks` router here
const express = require('express')
const Task = require('./model')

const router = express.Router()

router.get('/', (req, res) => {
  Task.get()
    .then(tasks => {
      res.status(201).json(tasks)
    })
})

router.post('/', (req, res) => {
  const { task_description, project_id } = req.body;

  if (!task_description || !project_id) {
    res.status(415).json({ error: 'Task description or project id is required' });
    return;
  }
  Task.create(req.body)
    .then(task => {
      res.status(201).json(task)
    })
    .catch(err => {
        res.status(err.statusCode || 500).json({
          error: err.message || 'Internal Server Error',
          statusCode: err.statusCode || 500
        })
    })
})

module.exports = router;
