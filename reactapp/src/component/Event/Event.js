import React, { Component } from 'react';
import Nav from '../Nav'
import Search from '../Search'
import DropDownMenu from '../DropDownMenu'
import SignUpButton from '../Signup/SignUpButton'
import LoginButton from '../Login/LoginButton'
import AddfavIcon from '../../pictures/addfav-icon.png'
import GroupChatIcon from '../../pictures/groupchat-icon.png'
import Footer from '../Footer'
import './Event.css'
import {Link} from "react-router-dom";
import JoinEventButton from "./JoinEventButton";
import ApplyIcon from "../../pictures/apply-icon.png";

let accessToken = 'pk.eyJ1IjoiamVycnlwZW5nMDIiLCJhIjoiY2tndHZwaGl5MDBhejJxcXBodW1wN3R3NyJ9.RS9i9jjvaZElQugyd9CJXQ';


class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login_status: sessionStorage.getItem('login_status'),
            username: sessionStorage.getItem('username'),
            event_id: this.props.match.params['id'],
            event_status: '',
            initiator_name: '',
            initiator_bio: '',
            initiator_email: '',
            initiator_id: '',
            initiator_profile_picture: null,
            name: '',
            description: '',
            time: '',
            trail_id: '',
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
                            const mapinfo = result['map_info'];
                            const firstCoord = mapinfo['data']['geometry']['coordinates'][0];
                            const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + firstCoord[0] +
                                ',' + firstCoord[1] + '.json?types=poi&access_token=' + accessToken;
                            fetch(url)
                                .then(res => res.json())
                                .then(result => {
                                    this.setState({
                                        trail_location: result['features'][0]['place_name']
                                    })
                                })
                            this.setState({
                                trail_id: result['id'],
                                trail_name: result['tname']
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
                                initiator_profile_picture: result['picture']
                            })
                        })

                    const participant_urls = result['participants']
                    let participants_nameid = []
                    for(let i = 0; i < participant_urls.length; i++) {
                        fetch(participant_urls[i])
                            .then(res => res.json())
                            .then(result => {
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
                        event_status: result['status'],
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
        const renderLoginButton = () => {
            if(this.state.login_status !== 'true'){
                return (<LoginButton />);
            } else {
                return (<p className="welcome-msg">Hello, {this.state.username}! :)</p >);
            }
        }

        const renderSignupButton = () => {
            if(this.state.login_status !== 'true'){
                return (<SignUpButton />);
            } else {
                return (<DropDownMenu />);
            }
        }

        const renderEventPage = () => {
            if(this.state.event_status === 'normal') {
                return (
                    <div>
                        <div className='header-container'>
                            <div><h3 className='title'><Link to='/'>HIKERRANK</Link></h3></div>
                            <Nav />
                            <Search />
                            {renderLoginButton()}
                            {renderSignupButton()}
                        </div>

                        <div className='content'>
                            <div className="event-left">
                                <Link to={'/profile/' + this.state.initiator_id + '/'}>
                                    <h3>EVENT INITIATOR</h3>
                                    <h4 id="username">{this.state.initiator_name}</h4>
                                    < img src={this.state.initiator_profile_picture} alt="image" width="170px"></img>
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
                                    <Link to={'/trail/' + this.state.trail_id}>
                                        <p className="trail-location-description">{this.state.trail_name}, {this.state.trail_location}</p >
                                    </Link>
                                    <h4>Date</h4>
                                    <p>{this.state.time}</p >
                                    <h4>Headcount</h4>
                                    <p>Expected: {this.state.headcount} |
                                        Confirmed: {Object.keys(this.state.participants).length} |
                                        Status: {(Object.keys(this.state.participants).length === this.state.headcount) ?
                                            'CLOSE' : 'OPEN'}</p >
                                    <h4>Contact Information</h4>
                                    <p>Email: {this.state.initiator_email}</p >
                                </div>
                            </div>

                            <div className="event-right">
                                <div className="apply-option">
                                    < img src={ApplyIcon} width="90px"></img>
                                    <JoinEventButton event_id={this.state.event_id} />
                                </div>

                                {/*<div className="addfav-option">*/}
                                {/*    < img src={AddfavIcon} width="170px"></img>*/}
                                {/*    <h3>Add to My Favorite</h3>*/}
                                {/*</div>*/}

                                <div className="groupchat-option">
                                    <Link to="/chat/test">
                                        < img src={GroupChatIcon} width="85px"></img>
                                        <h3>Join Group Chat</h3>
                                    </Link>
                                </div>
                            </div>


                        </div>

                        <Footer />


                    </div>
                );
            } else if(this.state.event_status === 'cancelled') {
                return (
                    <div>
                        <div className='header-container'>
                            <div><h3 className='title'><Link to='/'>HIKERRANK</Link></h3></div>
                            <Nav />
                            <Search />
                            {renderLoginButton()}
                            {renderSignupButton()}
                        </div>

                        <div className='content'>
                            <div className="event-left">
                                <h3>EVENT INITIATOR</h3>
                                <h4 id="username"></h4>
                                <div className="bio-box">
                                    <p id="bio"></p >
                                </div>

                                <br></br>
                                <h3>PARTICIPANTS</h3>

                            </div>

                            <div className="event-middle">
                                <h2></h2>
                                <div className="event-description">
                                    <div className="description-box">
                                        <span id="event-description">The event has been cancelled!</span>
                                    </div>
                                </div>
                                <div className="event-detail">
                                    <h3>EVENT DETAIL</h3>
                                    <h4>Location</h4>
                                    <p className="trail-location-description"></p >
                                    <h4>Date</h4>
                                    <p></p >
                                    <h4>Headcount</h4>
                                    <p>Expected: | Confirmed: | Status: </p >
                                    <h4>Contact Information</h4>
                                    <p></p >
                                </div>
                            </div>
                        </div>

                        <Footer />


                    </div>
                );
            } else if(this.state.event_status === '') {
                return (
                    <div>
                        <div className='header-container'>
                            <div><h3 className='title'><Link to='/'>HIKERRANK</Link></h3></div>
                            <Nav/>
                            <Search/>
                            {renderLoginButton()}
                            {renderSignupButton()}
                        </div>

                        <div className='content'>
                            <div className="event-left">
                                <h3>EVENT INITIATOR</h3>
                                <h4 id="username"></h4>
                                <div className="bio-box">
                                    <p id="bio"></p >
                                </div>

                                <br></br>
                                <h3>PARTICIPANTS</h3>

                            </div>

                            <div className="event-middle">
                                <h2></h2>
                                <div className="event-description">
                                    <div className="description-box">
                                        <span id="event-description">No such event!</span>
                                    </div>
                                </div>
                                <div className="event-detail">
                                    <h3>EVENT DETAIL</h3>
                                    <h4>Location</h4>
                                    <p className="trail-location-description"></p >
                                    <h4>Date</h4>
                                    <p></p >
                                    <h4>Headcount</h4>
                                    <p>Expected: | Confirmed: | Status: </p >
                                    <h4>Contact Information</h4>
                                    <p></p >
                                </div>
                            </div>
                        </div>

                        <Footer/>


                    </div>
                );
            }
        }

        return (renderEventPage());
    }
}

export default Event;