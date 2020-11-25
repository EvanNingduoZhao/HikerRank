import React, { Component } from "react";
import LoginButton from "../Login/LoginButton";
import SignUpButton from "../Signup/SignUpButton";
import DropDownMenu from "../DropDownMenu";
import {Link} from "react-router-dom";
import Nav from "../Nav";
import Search from "../Search";
import Footer from "../Footer";
import './Chat.css'
import WebSocketInstance from "./WebSocket";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_status: sessionStorage.getItem('login_status'),
            username: sessionStorage.getItem('username'),
        }
    }

    // componentDidMount() {
    //     WebSocketInstance.connect();
    // }

    render() {
        const renderLoginButton = ()=>{
            if(this.state.login_status!=='true'){
                return (
                    <LoginButton />
                    )
            } else {
                return (<p className="welcome-msg">Hello, {this.state.username}! :)</p >)
            }
        }

        const renderSignupButton = ()=>{
            if(this.state.login_status!=='true'){
                return (
                    <SignUpButton />
                    )
            } else {
                return (<DropDownMenu />)
            }
        }
        return (
            <div>
                <div className='header-container'>
                    <div><h3 className='title'><Link to='/'>HIKERRANK</Link></h3></div>
                    <Nav />
                    <Search />
                    {renderLoginButton()}
                    {renderSignupButton()}
                </div>
                <div className="content">
                    <div className="chat-left">
                        <h3>Participants</h3>
                        <p>Jerry</p>
                        <p>Evan</p>
                        <p>Laura</p>
                        <p>Ariadne</p>
                    </div>
                    <div className="chat-right">
                        <div className="chat-messages">
                            <p>Message 1</p>
                        </div>
                        <div className="chat-user-input">
                            <input
                                // onChange={}
                                //    value={}
                                   required
                                   id="chat-message-input"
                                   type="text"
                                   size = "100"
                                   placeholder="Write your message..." />
                            <button id="chat-message-submit" className="submit">
                                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}

export default Chat;