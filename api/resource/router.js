// build your `/api/resources` router here
const express = require('express')
const Resource = require('./model')

const router = express.Router()

router.get('/', (req, res) => {
  Resource.get()
    .then(projects => {
      res.status(201).json(projects)
    })
})

router.post('/', (req, res) => {
  Resource.create(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(err => {
        res.status(err.statusCode || 500).json({
          error: err.message || 'Internal Server Error',
          statusCode: err.statusCode || 500
        })
    })
})

module.exports = router
