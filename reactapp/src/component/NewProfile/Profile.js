import React, { Component } from 'react';
import './Profile.css'
import Nav from '../Nav'
import Search from '../Search'
import SignUpButton from '../Signup/SignUpButton'
import LoginButton from '../Login/LoginButton'
import DropDownMenu from '../DropDownMenu'
import ProfilePic from '../../pictures/profile-picture.png'
import EditProfileButton from './EditProfileButton'
import UserCheckins from './UserCheckins'
import FriendsList from './FriendsList'
import Footer from '../Footer'
import Album from './Album'

class Profile extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            login_status: sessionStorage.getItem('login_status'),
            username: sessionStorage.getItem('username'),
            profile_id: this.props.match.params['id'],
            profile_username: '',
            profile_bio: '',
            profile_picture: null,
            is_self: false,
            error: null,
            isLoaded: false,

        }
    }

    componentDidMount(){
        const api_url = '/api/profile/'+this.state.profile_id+'/'
        console.log(api_url)
        fetch(api_url)
        .then(res => res.json())
        .then(
            result =>{
                console.log(result['picture']);
                this.setState({
                    profile_bio:result['bio'],
                    profile_picture:result['picture']
                },()=>{console.log(this.state)})
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
                    <div><h3 className='title'>HIKERRANK</h3></div> 
                    <Nav />
                    <Search />
                    {renderLoginButton()}
                    {renderSignupButton()}
                </div>

                <div className='content'>
                    <div className='left'>
                        <p id="username">{this.state.username}</p>
                        <img src={this.state.profile_picture} alt="image" width="170px" ></img>
                        <div className="bio-box">
                            <p id="bio">{this.state.profile_bio}</p>
                        </div>
                        <EditProfileButton profileId={this.state.profile_id} ini_picture={this.state.profile_picture}/>
                        <FriendsList />
                        
                    </div>

                    <div className='right'>
                        <UserCheckins />
                        <Album />
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default Profile;