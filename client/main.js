var React = require('react');
var ReactDOM = require('react-dom');
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/SignUp.jsx';
import './style.css';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </div>
    </Router>,
    document.getElementById('tasks-list')
);