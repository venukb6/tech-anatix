const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
});

module.exports = mongoose.model('Client', clientSchema);