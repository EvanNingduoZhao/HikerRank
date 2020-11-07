import React, { Component } from 'react';
import Nav from '../Nav'
import Search from '../Search'
import DropDownMenu from '../DropDownMenu'
import UserProfile from '../NewProfile/UserProfile'
import ProfilePic from '../../pictures/profile-picture.png'
import ApplyIcon from '../../pictures/apply-icon.png'
import AddfavIcon from '../../pictures/addfav-icon.png'
import GroupChatIcon from '../../pictures/groupchat-icon.png'
import './Event.css'

class Event extends Component {
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
                        {/* <UserProfile /> */}
                        <h4 id="username">Username</h4>
                        <img src={ProfilePic} width="170px"></img>
                        <div className="bio-box">
                            <p id="bio">Description box of the event initiator's profile.</p>
                        </div>
                        <br></br>
                        <h3>PARTICIPANTS</h3>
                        <p>Username</p>
                        <p>Username</p>
                        <p>Username</p>
                        <p>Username</p>
                        <p>Username</p>

                    </div>

                    <div className="event-middle">
                        <h2>Big Header for Event Name</h2>
                        <div className="event-description">
                            <div className="description-box">
                            <span id="event-description">Description box of event description</span>
                            </div>
                        </div>
                        <div className="event-detail">
                            <h3>EVENT DETAIL</h3>
                            <h4>Location</h4>
                            <p>Rachel Carson Trail, Natrona Heights, PA 15065</p>
                            <h4>Date</h4>
                            <p>9:00 am, October 21, 2020</p>
                            <h4>Headcount</h4>
                            <p>Expected: 10  |  Confirmed: 4  |  Recruiting Status:  OPEN</p>
                            <h4>Contact Information</h4>
                            <p>Phone: 412-999-9999   |   Email: hello@gmail.com</p>
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
                

            </div>
        );
    }
}

export default Event;