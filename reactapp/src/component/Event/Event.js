import React, { Component } from 'react';
import Nav from '../Nav'
import Search from '../Search'
import DropDownMenu from '../DropDownMenu'
import ProfilePic from '../../pictures/profile-picture.png'
import ApplyIcon from '../../pictures/apply-icon.png'
import AddfavIcon from '../../pictures/addfav-icon.png'
import GroupChatIcon from '../../pictures/groupchat-icon.png'
import Footer from '../Footer'
import './Event.css'

class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login_status: sessionStorage.getItem('login_status'),
            event_id: this.props.match.params['id'],
            initiator_name: '',
            initiator_bio: '',
            initiator_email: '',
            name: '',
            description: '',
            time: '',
            trail_name: '',
            trail_location: '',
            headcount: 0,
            participant_names: []
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
                                initiator_email: result['email']
                            })
                        })

                    const participant_urls = result['participants']
                    let participant_list = []
                    console.log(participant_urls)
                    for(let i = 0; i < participant_urls.length; i++) {
                        fetch(participant_urls[i])
                            .then(res => res.json())
                            .then(result => {
                                participant_list.push(result['username'])
                                this.setState({
                                    ...this.state
                                })
                            })
                    }

                    let time = new Date(result['time'])
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
                        participant_names: participant_list
                    })
                }
            )
    }

    render() {
        return (
            <div>
                <div className='header-container'>
                    <div><h3 className='title'>HIKERRANK</h3></div>
                    <Nav />
                    <Search />
                    <DropDownMenu />
                </div>

                <div className='event-content'>
                    <div className="event-left">
                        <h3>EVENT INITIATOR</h3>
                        <h4 id="username">{this.state.initiator_name}</h4>
                        <img src={ProfilePic} width="170px"></img>
                        <div className="bio-box">
                            <p id="bio">{this.state.initiator_name}</p>
                        </div>
                        <br></br>
                        <h3>PARTICIPANTS</h3>
                        {this.state.participant_names.map(participant => (
                            <p>{participant}</p>
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
                            <p>{this.state.trail_name} {this.state.trail_location}</p>
                            <h4>Date</h4>
                            <p>{this.state.time}</p>
                            <h4>Headcount</h4>
                            <p>Expected: {this.state.headcount}  |  Confirmed: {this.state.participant_names.length}  |  Recruiting Status:  OPEN</p>
                            <h4>Contact Information</h4>
                            <p>Phone: 412-999-9999   |   Email: {this.state.initiator_email}</p>
                        </div>
                    </div>

                    <div className="event-right">
                        <div className="apply-option">
                            <img src={ApplyIcon} width="90px"></img>
                            <h3>Request and Join</h3>
                        </div>

                        <div className="addfav-option">
                            <img src={AddfavIcon} width="170px"></img>
                            <h3>Add to My Favorite</h3>
                        </div>

                        <div className="groupchat-option">
                            <img src={GroupChatIcon} width="85px"></img>
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