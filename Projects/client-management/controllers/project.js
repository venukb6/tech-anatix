const Project = require('../models/project');

//get all projects from the project collection in database and send it as a json response
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

//get one single project from the project collection in database and send it as a json response
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


//create new document using the data received through the request and then save it to the project collection
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


//find the single project using id and then update that project details in the project collection
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


//find the project by its id and delete it
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