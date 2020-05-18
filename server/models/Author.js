import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    login: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
});

const Author = mongoose.model('Author',AuthorSchema);