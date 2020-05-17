import decode from 'jwt-decode';
import axios from 'axios';
import socketIOClient from "socket.io-client";

export default class AuthHelperMethods {

    login(username, password){
        const socket = socketIOClient('localhost:3001');
        socket.emit('log-in',{username, password});
        socket.on('loggedIn',(token) => {
            console.log(token);
            this.setToken(token.token);
            socket.emit('SetUpToken',{success: true});
        })
        socket.on('Invalid Credentials', (data) => {
            console.log(data);
        })
        socket.on('Entered Password and Hash do not match!', (data) => {
            console.log(data);
        })
    }


    loggedIn(){
        const token = this.getToken();
        console.log(token);
        return !!token && !this.isTokenExpired(token) 
    }

    isTokenExpired(token){
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { 
                return true;
            }
            else
                return false;
        }
        catch (err) {
            console.log("expired check failed! Line 42: AuthService.js");
            return false;
        }
    }

    setToken(idToken){
        localStorage.setItem('id_token', idToken)
    }

    getToken(){
        return localStorage.getItem('id_token')
    }

    logout(){
        localStorage.removeItem('id_token');
    }

    getConfirm(){
        let answer = decode(this.getToken());
        console.log("Recieved answer!");
        return answer;
    }
}