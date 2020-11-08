import React, { Component } from 'react';
import './UserProfile.css'
import ProfilePic from '../../pictures/profile-picture.png'
import EditProfileButton from './EditProfileButton'

class UserProfile extends Component {
    render() {
        return (
            <div>
                <p id="username">USERNAME</p>
                <img src={ProfilePic} width="170px"></img>
                <div className="bio-box">
                    <p id="bio">Welcome to your personal homepage! Click the button below to eddit your profile.</p>
                </div>
                <EditProfileButton />
                
                
            </div>
        );
    }
}

export default UserProfile;