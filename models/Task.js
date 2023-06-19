const mongoose = require('mongoose')

// define the document schema
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        maxlength: [20, 'Name cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// export the module
module.exports = mongoose.model('Task', TaskSchema)