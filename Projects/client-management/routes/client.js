const express = require('express');
const router = express.Router();

const Client = require('../models/client');

//get all clients
router.get('/', (req, res) => {
    Client.find().populate('projects').exec()
        .then(clients => {
            res.json(clients);
        })
        .catch(err => {
            res.status(500).send(err)
        });
})

//create new client
router.post('/', (req, res) => {
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
})

//update client
router.put('/:id', (req, res) => {
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
})

//delete client
router.delete('/:id', (req, res) => {
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
});

module.exports = router;