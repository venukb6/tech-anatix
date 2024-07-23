const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(Cors());

app.use(express.static(path.join(__dirname, 'public')));

//connecting mongodb to thr project using mongoose
mongoose.connect('mongodb://localhost:27017/client-management')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

const clientRoutes = require('./routes/client');
const projectRoutes = require('./routes/project');

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'client.html'));
})

app.use('/clients', clientRoutes);
app.use('/projects', projectRoutes);




app.listen(5000);