// build your `/api/projects` router here
const express = require('express')
const Project = require('./model')

const router = express.Router()

router.get('/', (req, res) => {
  Project.get()
    .then(projects => {
      res.status(201).json(projects)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json([])
    })
})

router.post('/', (req, res) => {
  const { project_name } = req.body;

  if (!project_name) {
    res.status(415).json({ error: 'Project name is required' });
    return;
  }

  Project.create(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json([]);
    });
});


module.exports = router;
