const express = require('express');
const bodyParser = require('body-parser');
const Cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(Cors());

// mongoose.connect('mongodb://localhost:27017/client-management', {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// });

mongoose.connect('mongodb://localhost:27017/client-management')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

const clientRoutes = require('./routes/client');
const projectRoutes = require('./routes/project');

app.use('/clients', clientRoutes);
app.use('/projects', projectRoutes);

app.get('/', (req, res) =>{
    res.send('In base route');
})


// .then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Error connecting to MongoDB', err);
// });

// const ClientSchema = new mongoose.Schema({
//     slno: Number,
//     name: String
// })

// const ClientModel = mongoose.model('client', ClientSchema)

app.get('/', (req, res) => {
    res.send('hello')

})



app.listen(5000);