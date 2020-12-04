import React, {Component} from "react";
import WebSocketInstance from "./WebSocket";
import './Chat.css';
import Chat from "./Chat";
import Sidepanel from "./Sidepanel";
import {Link, Redirect} from "react-router-dom";
import Nav from "../Nav";
import Footer from "../Footer";
import DropDownMenu from "../DropDownMenu";

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_status: sessionStorage.getItem('login_status'),
            username: sessionStorage.getItem('username'),
            chat_id: this.props.match.params['chatID'],
        }
    }

    render() {
        const renderChatPage = () => {
            if(this.state.login_status !== 'true') {
                return (<Redirect to='/login' />);
            } else {
                WebSocketInstance.connect(this.state.chat_id);
                return (
                    <div>
                        <div className='header-container'>
                            <div><h3 className='title'><Link to='/'>HIKERRANK</Link></h3></div>
                            <Nav />
                            <p className="welcome-msg">Hello, {this.state.username}! :)</p >
                            <DropDownMenu />
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

        return (renderChatPage());
    }
}

export default ChatPage