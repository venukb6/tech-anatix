const Project = require('../models/project');


exports.getAllProjects = (req, res) => { 
    console.log('inside get all projects route')
    Project.find().populate('client').exec()
        .then(projects => {
            res.json(projects)
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

exports.getoneProject = (req, res) => { 
  console.log('inside get one project route')
  const projectId = req.params.id;
  Project.findById(projectId)
      .then(project => {
          res.json(project)
      })
      .catch(err => {
          res.status(500).send(err)
      })
}



exports.postNewProject = (req, res) => {
    const newProject = new Project(req.body)
    newProject.save()
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}



exports.postUpdateProject = (req, res) => {
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
}



exports.postDeleteProject = (req, res) => {
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
  }