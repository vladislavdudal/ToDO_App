import React, { Component } from "react";
import HelperMethods from './HelperMethods.jsx';
import { Link } from 'react-router-dom';
import './Login.less';
import socketIOClient from "socket.io-client";

class Login extends Component {

    constructor(props){
        super(props);

        this.Auth = new HelperMethods();

        this.state = {
            username: "",
            password: ""
        }

        this._handleChange = this._handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    
    _handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit(e){
        e.preventDefault();
        console.log(this.state.username, this.state.password);
        this.Auth.login(this.state.username, this.state.password);
        const socket = socketIOClient("localhost:3001");
        socket.on('Root', (data) => {
            console.log(data);
            this.props.history.replace('/');
        })
    }

    componentWillMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    render() {

        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <div className="box">
                        <div className="box-header">
                            <h1>Login</h1>
                        </div>
                        <form className="box-form">
                            <input
                                className="form-item"
                                placeholder="Username"
                                name="username"
                                type="text"
                                onChange={this._handleChange}
                            />
                            <input
                                className="form-item"
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={this._handleChange}
                            />
                            <button className="form-submit" onClick={this.handleFormSubmit}>Login</button>
                        </form>
                        <Link className="link" to="/signup">Don't have an account? <span className="link-signup">Signup</span></Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Login;