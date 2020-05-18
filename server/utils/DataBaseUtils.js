import mongoose from "mongoose";

import "../models/task";

import "../models/Author";

const Author = mongoose.model('Author');
const Task = mongoose.model('Task');

export function createAuthor(data) {
    const autor = new Author({
        login: data.login,
        password: data.password
    });

    return autor.save();
}

export function findAuthor(){
    return Author.find();
}

export function setConnection(){
    return mongoose.connect(`mongodb://localhost:27017/laba2`);
}

export function allTasks(){
    return Task.find();
}

export function createTask(data){
    const task = new Task({
        taskName: data.taskName,
        status: data.status,
        date: data.date,
        color: data.color
    });

    return task.save();
}

export function deleteTask(id){
    return Task.findById(id).remove();
}