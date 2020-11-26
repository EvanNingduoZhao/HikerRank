import React, {Component} from "react";
import WebSocketInstance from "./WebSocket";
import './Chat.css';
import Chat from "./Chat";
import Sidepanel from "./Sidepanel";

class ChatPage extends Component {
    constructor(props) {
        super(props);
        WebSocketInstance.addCallbacks(
            this.props.setMessages.bind(this),
            this.props.addMessage.bind(this)
        );
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="chat-page">
                <div id="frame">
                    <Sidepanel />
                    <div className="content">
                        <Chat />
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPage