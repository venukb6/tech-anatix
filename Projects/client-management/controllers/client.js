const Client = require('../models/client');

exports.getAllClients = (req, res) => {
    Client.find().populate('projects').exec()
        .then(clients => {
            res.json(clients);
        })
        .catch(err => {
            res.status(500).send(err)
        });
}

exports.getOneClient = (req, res) => {
    console.log('inside get one client controller')
    const clientId = req.params.id;
    Client.findById(clientId)
        .then(client => {
            res.json(client);
        })
        .catch(err => {
            res.status(500).send(err)
        });
}


exports.postNewClient = (req, res) => {
    console.log('in create client route')
    const newClient = new Client(req.body);
    newClient.save()
        .then(client => {
            res.json(client)
        })
        .catch(err => {
            console.log('hello')
            res.status(500).send(err)
        })
}


exports.postUpdateClient = (req, res) => {
    Client.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(client => {
            if(!client) {
                res.status(404).send('Client not found');
            }
            res.json(client)
        })
        .catch(err => {
            res.status(500).send(err)
        })
}


exports.postDeleteClient = (req, res) => {
    Client.findByIdAndDelete(req.params.id)
        .then(client => {
            if(!client) {
                res.status(404).send('Client not found');
            }
            res.json(client)
        })
        .catch(err => {
            res.status(500).send(err)
        })
}
