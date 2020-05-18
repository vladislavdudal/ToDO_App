import mongoose from "mongoose"

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskName: {
        type: String,
        required:true
    },
    status: {
        type: String
    },
    date: {
        type: String
    },
    color: {
        type: String
    }
});

const Task = mongoose.model('Task',TaskSchema);