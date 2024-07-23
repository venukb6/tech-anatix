const Client = require('../models/client');

//get all clients from the client collection in database and send it as a json response
exports.getAllClients = (req, res) => {
    Client.find().populate('projects').exec()
        .then(clients => {
            res.json(clients);
        })
        .catch(err => {
            res.status(500).send(err)
        });
}

//get one single client from the client collection in database and send it as a json response
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

//create new document using the data received through the request and then save it to the client collection
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

//find the single client using id and then update that client details in the client collection
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

//find the client by its id and delete it
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
