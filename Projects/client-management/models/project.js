const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {type: String, enum: ['Planning', 'Active', 'Completed'], default: 'Planning'},
    deadline: Date,
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'}
});

module.exports = mongoose.model('Project', projectSchema);