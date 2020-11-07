import React, { Component } from 'react';
import './Profile.css'
import Nav from '../Nav'
import Search from '../Search'
import DropDownMenu from '../DropDownMenu'
import UserProfile from './UserProfile'
import UserCheckins from './UserCheckins'
import FriendsList from './FriendsList'
import Album from './Album'

class Profile extends Component {
    render() {
        return (
            <div>
                <div className='header-container'>
                    <div><h3 className='title'>HIKERRANK</h3></div> 
                    <Nav />
                    <Search />
                    <DropDownMenu />
                </div>

                <div className='content'>
                    <div className='left'>
                        <UserProfile />
                        <FriendsList />
                        
                    </div>

                    <div className='right'>
                        <UserCheckins />
                        <Album />
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;