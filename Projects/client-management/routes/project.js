const express = require('express');
const router = express.Router();

const Project = require('../models/project');

//get all projects
router.get('/', (req, res) => {
    Project.find().populate('client').exec()
        .then(projects => {
            res.json(projects)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

//create new project
router.post('/', (req, res) => {
    const newProject = new Project(req.body)
    newProject.save()
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

//update project
router.put('/:id', (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(project => {
        if (!project) {
          return res.status(404).send('Project not found');
        }
        res.json(project); 
      })
      .catch(err => {
        res.status(500).send(err); 
      });
});

//delete project
router.delete('/:id', (req, res) => {
    Project.findByIdAndDelete(req.params.id)
      .then(project => {
        if (!project) {
          return res.status(404).send('Project not found'); 
        }
        res.json(project); 
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });


module.exports = router; 