import React, { Component } from 'react';
import Nav from '../Nav'
import Search from '../Search'
import DropDownMenu from '../DropDownMenu'
import ProfilePic from '../../pictures/profile-picture.png'
import SignUpButton from '../Signup/SignUpButton'
import LoginButton from '../Login/LoginButton'
import ApplyIcon from '../../pictures/apply-icon.png'
import AddfavIcon from '../../pictures/addfav-icon.png'
import GroupChatIcon from '../../pictures/groupchat-icon.png'
import Footer from '../Footer'
import './Event.css'
import {Link} from "react-router-dom";

class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login_status: sessionStorage.getItem('login_status'),
            username: sessionStorage.getItem('username'),
            event_id: this.props.match.params['id'],
            initiator_name: '',
            initiator_bio: '',
            initiator_email: '',
            initiator_id: '',
            name: '',
            description: '',
            time: '',
            trail_name: '',
            trail_location: '',
            headcount: 0,
            participants: {}
        }
    }

    componentDidMount() {
        fetch('/api/event/' + this.state.event_id + '/')
            .then(res => res.json())
            .then(
                result => {
                    const trail_url = result['trail']
                    fetch(trail_url)
                        .then(res => res.json())
                        .then(result => {
                            this.setState({
                                trail_name: result['name'],
                                trail_location: result['location']
                            })
                        })

                    const user_url = result['initiator']
                    fetch(user_url)
                        .then(res => res.json())
                        .then(result => {
                            this.setState({
                                initiator_name: result['username'],
                                initiator_email: result['email'],
                                initiator_id: result['id']

                            })
                        })

                    const profile_url = String(user_url).replace("user", "profile")
                    fetch(profile_url)
                        .then(res => res.json())
                        .then(result => {
                            this.setState({
                                initiator_bio: result['bio'],
                            })
                        })

                    const participant_urls = result['participants']
                    let participants_nameid = []
                    for(let i = 0; i < participant_urls.length; i++) {
                        fetch(participant_urls[i])
                            .then(res => res.json())
                            .then(result => {
                                // participants_nameid.push(result['username'])
                                participants_nameid[result['username']] = result['id']
                                this.setState({
                                    ...this.state
                                })
                            })
                    }

                    let time = new Date(result['event_time'])
                    let displayTime = (time.getMonth() + 1) + '/' + time.getDate()
                                        + '/' + time.getFullYear()
                                        + ' ' + (time.getHours() < 10 ? '0' : '')
                                        + (time.getHours() % 12 === 0 ? 12 : (time.getHours() % 12)) + ':'
                                        + (time.getMinutes() < 10 ? '0' : '')
                                        + time.getMinutes() + (time.getHours() < 12 ? 'AM' : 'PM');
                    this.setState({
                        initiator_url: result['initiator'],
                        name: result['name'],
                        description: result['description'],
                        time: displayTime,
                        headcount: result['headcount'],
                        participants: participants_nameid
                    })
                }
            )
    }

    render() {
        const renderLoginButton = ()=>{
            if(this.state.login_status!=='true'){
              return (
                  <LoginButton />
              )
            } else {
              return (<p className="welcome-msg">Hello, {this.state.username}! :)</p>)
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

                <div className='event-content'>
                    <div className="event-left">
                        <Link to={'/profile/' + this.state.initiator_id + '/'}>
                            <h3>EVENT INITIATOR</h3>
                            <h4 id="username">{this.state.initiator_name}</h4>
                            < img src={ProfilePic} width="170px"></img>
                            <div className="bio-box">
                            <p id="bio">{this.state.initiator_bio}</p >
                        </div>
                        </Link>

                        <br></br>
                        <h3>PARTICIPANTS</h3>
                        {Object.keys(this.state.participants).map(name => (
                            <p><Link to={'/profile/' + this.state.participants[name] + '/'}>{name}</Link></p >
                        ))}

                    </div>

                    <div className="event-middle">
                        <h2>{this.state.name}</h2>
                        <div className="event-description">
                            <div className="description-box">
                            <span id="event-description">{this.state.description}</span>
                            </div>
                        </div>
                        <div className="event-detail">
                            <h3>EVENT DETAIL</h3>
                            <h4>Location</h4>
                            <p>{this.state.trail_name}, {this.state.trail_location}</p >
                            <h4>Date</h4>
                            <p>{this.state.time}</p >
                            <h4>Headcount</h4>
                            <p>Expected: {this.state.headcount} |
                                Confirmed: {Object.keys(this.state.participants).length} |
                                Status: {(Object.keys(this.state.participants).length === this.state.headcount) ?
                                    'CLOSE' : 'OPEN'}</p >
                            <h4>Contact Information</h4>
                            <p>Phone: 412-999-9999   |   Email: {this.state.initiator_email}</p >
                        </div>
                    </div>

                    <div className="event-right">
                        <div className="apply-option">
                            < img src={ApplyIcon} width="90px"></img>
                            <h3>Request and Join</h3>
                        </div>

                        <div className="addfav-option">
                            < img src={AddfavIcon} width="170px"></img>
                            <h3>Add to My Favorite</h3>
                        </div>

                        <div className="groupchat-option">
                            < img src={GroupChatIcon} width="85px"></img>
                            <h3>Join Group Chat</h3>
                        </div>
                    </div>


                </div>

                <Footer />


            </div>
        );
    }
}

export default Event;