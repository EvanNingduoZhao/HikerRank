import React, {Component} from "react";
import WebSocketInstance from "./WebSocket";
import './Chat.css';
import Chat from "./Chat";
import Sidepanel from "./Sidepanel";
import {Link, Redirect} from "react-router-dom";
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
            chat_id: this.props.match.params['chatID'],
            approved_status: 'false'
        }
    }

    componentDidMount() {
        // fetch('/api/processed-request/')
        //     .then(res => res.json())
        //     .then(result => {
        //         let flag = false;
        //         for(let i = 0; i < result.length; i++) {
        //             const userURL = result[i]['user'];
        //             fetch(userURL)
        //                 .then(res => res.json())
        //                 .then(result => {
        //                     console.log(result['username']);
        //                     console.log(this.state.username);
        //                     let userName = result['username'];
        //                     if(userName === this.state.username) {
        //                         console.log("here");
        //                         this.setState({
        //                             ...this.state,
        //                             approved_status: 'true'
        //                         }, () => {console.log(this.state)});
        //                         // flag = true;
        //                         // console.log(flag);
        //                     }
        //                     console.log(this.state);
        //                 })
        //         }
        //         // this.setState({
        //         //     ...this.state
        //         // }, () => {console.log(this.state)})
        //         // console.log(flag);
        //         // if(flag) {
        //         //
        //         // }
        //     })
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

        // const renderChatPage = () => {
        //     // console.log(this.state);
        //     if(this.state.login_status !== 'true') {
        //         alert("You have not logged in!");
        //         return (<Redirect to='/login' />);
        //     } else if(this.state.approved_status !== 'true') {
        //         alert("You have not been approved for joining this event yet!");
        //         alert(this.state);
        //         // return (<Redirect to={'/event/' + this.state.chat_id + '/'} />);
        //     } else {
        //         WebSocketInstance.connect(this.state.chat_id);
        //         return (
        //             <div>
        //                 <div className='header-container'>
        //                     <div><h3 className='title'><Link to='/'>HIKERRANK</Link></h3></div>
        //                     <Nav />
        //                     <Search />
        //                     {/*{renderLoginButton()}*/}
        //                     {/*{renderSignupButton()}*/}
        //                     <p className="welcome-msg">Hello, {this.state.username}! :)</p >
        //                     <DropDownMenu />
        //                 </div>
        //                 <div className="chat-page">
        //                     <div id="frame">
        //                         <Sidepanel />
        //                         <Chat chat_id = {this.state.chat_id} />
        //                     </div>
        //                 </div>
        //                 <Footer />
        //             </div>
        //         );
        //     }
        // }
        //
        // return (renderChatPage());

    }
}

export default ChatPage