import React, {Component} from "react";
import WebSocketInstance from "./WebSocket";
import './Chat.css';
import Chat from "./Chat";
import Sidepanel from "./Sidepanel";
import {Link} from "react-router-dom";
import Nav from "../Nav";
import Search from "../Search";
import Footer from "../Footer";
import LoginButton from "../Login/LoginButton";
import SignUpButton from "../Signup/SignUpButton";
import DropDownMenu from "../DropDownMenu";

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_status: sessionStorage.getItem('login_status'),
            username: sessionStorage.getItem('username'),
            chat_id: this.props.match.params['chatID']
        }
    }

    componentDidMount() {
        WebSocketInstance.connect(this.state.chat_id);
    }

    render() {
        const renderLoginButton = () => {
            if(this.state.login_status!=='true'){
                return (
                    <LoginButton />
                    )
            } else {
                return (<p className="welcome-msg">Hello, {this.state.username}! :)</p >)
            }
        }

        const renderSignupButton = () => {
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
                <div className="chat-page">
                    <div id="frame">
                        <Sidepanel />
                        <Chat chat_id = {this.state.chat_id} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ChatPage