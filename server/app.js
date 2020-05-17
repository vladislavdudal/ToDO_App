import express from 'express';
import bodyParser from 'body-parser';
var cookieParser = require('cookie-parser');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
import * as db from './utils/DataBaseUtils';
import cors from 'cors';
const socketIO = require('socket.io');
const graphQLExpress = require('express-graphql');
import {buildSchema} from 'graphql';

db.setConnection();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin:'*'}));

const schema = buildSchema(`
    type Query {
        allTasks: [Task]
    },
    
    type Mutation {
        createTask( taskName: String, status: String, date: String, color: String): Task,
        deleteTask(id: String): Task
    },
    

    type Task {
        _id: String,
        taskName: String,
        status: String,
        date: String,
        color: String
    }
`);

const root = {
    allTasks: () => {
      return db.allTasks()
      .then(tasks => {
        console.log(tasks);
        delete tasks.__v;
        return tasks;
      })
      .catch(err => console.log('ERROR', err));
    },
    createTask: (args => {
      return db.createTask(args)
      .then(task => {
        console.log('TASK', task);
        return task;
      })
    }),
    deleteTask: (args => {
        const id = args.id;
        console.log(args);
        return db.deleteTask(id)
            .then(task => {
                console.log("Deleted",task);
                return task;
            })
    })
  };

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.use('/graphql',graphQLExpress({
    schema,
    rootValue: root,
    graphiql: true
}))


const server =  app.listen(3001, () => {
    console.log('Server working...');
});

const io = socketIO(server);

io.on('connection', (socket) => {

    socket.on('sign-up', (data) => {
        const {username,password} = data;
        const saltRounds = 10;
        bcrypt.hash(password,saltRounds,function(err, hash){
            db.createAuthor({
                login:username,
                password:hash
            })
            .then((result) => {
                console.log("User created ", result);
                socket.emit("successSignUp","User created");
            });
        });
    })


    socket.on('log-in', (data) => {
        const {username,password} = data;
        console.log("User submitted");

        db.findAuthor()
        .then((users) => {
            console.log("User Found: ", users);
            const arr = users.filter((user) => user.login == username);
            const user = arr[0];
            if (user === undefined) {
                io.sockets.emit('Invalid Credentials',{
                    sucess: false,
                    token: null,
                    err: 'Invalid Credentials'
                })
            } else {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (result === true) {
                        console.log("Valid!");
        
                        let token = jwt.sign(
                        {
                            username: user.login
                        },
                        'super secret',
                        { expiresIn: 129600 });
                        io.sockets.emit('loggedIn',{
                            sucess: true,
                            err: null,
                            token
                        })
                    }
                    else {
                        console.log("Entered Password and Hash do not match!");
                        io.sockets.emit('Entered Password and Hash do not match!',{
                            sucess: false,
                            token: null,
                            err: 'Entered Password and Hash do not match!'
                        })
                    };
                });
            }
        });
    });


    socket.on('SetUpToken',(data) => {
        console.log("Token set up:", data.success);
        io.sockets.emit("Root","GotoProgram");
    });

    

})