import Editor from './TaskEditor.jsx';
import Grid from './TaskGrid.jsx';
import HelperMethods from './HelperMethods.jsx';
import withAuth from './withAuth.jsx'
import { Link, Redirect } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import './App.less';
import axios from 'axios';
var React = require('react');

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {tasks: []};
        this.Auth = new HelperMethods();
        this.handleTaskAdd = this.handleTaskAdd.bind(this);
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    shallowEqual(objA, objB) {
        if (objA === objB) {
          return true;
        }
      
        if (typeof objA !== 'object' || objA === null ||
            typeof objB !== 'object' || objB === null) {
          return false;
        }
      
        var keysA = Object.keys(objA);
        var keysB = Object.keys(objB);
      
        if (keysA.length !== keysB.length) {
          return false;
        }
      
        var bHasOwnProperty = hasOwnProperty.bind(objB);
        for (var i = 0; i < keysA.length; i++) {
          if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
          }
        }
      
        return true;
    }
      
    shallowCompare(instance, nextProps, nextState) {
        return (
          !this.shallowEqual(instance.props, nextProps) ||
          !this.shallowEqual(instance.state, nextState)
        );
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.shallowCompare(this, nextProps, nextState);
    }

    componentDidMount() {
        fetch('http://localhost:3001/graphql',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({query: 
                `query task {
                    allTasks {
                        _id
                        taskName
                        status
                        date
                        color
                    }
                }`, variables : []})
        }). then( r => r.json()).then(data => {
            console.log(data)
            this.setState({tasks: data.data.allTasks});
        })
    }

    handleLogout(){
        this.Auth.logout()
        this.props.history.replace('/login');
    }

    handleTaskAdd(data){
        fetch('http://localhost:3001/graphql',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({query: 
                `mutation task($taskName: String, $status: String, $date: String, $color: String) {
                    createTask(taskName: $taskName, status: $status, date: $date, color: $color) {
                      _id
                      taskName
                      status
                      date
                      color
                    }
                }`, variables: data})
        }). then( r => r.json()).then(data => {
            console.log(data)
            this.setState({tasks: [...this.state.tasks, data.data.createTask]});
        })
    }

    handleTaskDelete(data) {
        const id = data._id;
        fetch('http://localhost:3001/graphql',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({query: 
                `mutation task($id: String) {
                    deleteTask(id: $id) {
                      _id
                      taskName
                      status
                      date
                      color
                    }
                }`, variables: {id} })
        }). then( r => r.json()).then(data => {
            console.log(data);
            console.log(id);
            this.setState((prevState) => ({
                tasks: prevState.tasks.filter((elem) => id !== elem._id)
            }));
        })
    }

    render(){
        return (
            <div className="App">
                <h2 className="App_header"></h2>
                <Editor onTaskAdd={this.handleTaskAdd}/>
                <button onClick={this.handleLogout}>LOGOUT</button>
                <Grid tasks={this.state.tasks} onTaskDelete={this.handleTaskDelete}/>
            </div>
        );
    }
};

export default withAuth(App);