import React, {Component} from "react";
import HelperMethods from './HelperMethods.jsx';
import axios from "axios";
import { Link } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import './Login.less';

export default class Signup extends Component {
    
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
        console.log(this.state);
    }

    handleFormSubmit(e){
        e.preventDefault();
        const socket = socketIOClient('localhost:3001');
        console.log('privet',this.state.username,this.state.password);
        socket.emit('sign-up',{
            username: this.state.username,
            password: this.state.password
        });
        socket.on('successSignUp',(data) => {
            console.log(data);
            this.props.history.replace('/login');
        })
    }

    componentDidMount() {
        console.log(this.Auth.loggedIn());
        if(this.Auth.loggedIn()){
            this.props.history.push('/dashboard')
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <div className="box">
                        <div className="box-header">
                            <h1>Signup</h1>
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
                            <button className="form-submit" onClick={this.handleFormSubmit}>Signup</button>
                        </form>
                        <Link className="link" to="/login">Already have an account? <span className="link-signup">Login</span></Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}