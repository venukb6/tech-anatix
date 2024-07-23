const mongoose = require('mongoose');
const project = require('./project');

const clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
});

// clientSchema.pre('findByIdAndDelete', async function(next){
//     try {
//         await project.deleteMany({ client: this._id});
//         next()
//     } catch(err) {
//         next(err);
//     }
// })

module.exports = mongoose.model('Client', clientSchema);