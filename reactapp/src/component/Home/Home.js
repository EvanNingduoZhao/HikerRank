import '../../App.css';
import './Home.css';
import homepagePic from '../../pictures/homepage_pic.jpg';
import sampleMap from '../../pictures/sample-map.png'
import Nav from '../Nav'
import Search from '../Search'
import SignUpButton from '../Signup/SignUpButton'
import LoginButton from '../Login/LoginButton'
import DisplayTrail from '../DisplayTrail'
import PrettierSearch from '../PrettierSearch'
import Filter from '../Filter'
import UserMenu from '../UserMenu'
import DropDownMenu from '../DropDownMenu'


import React, { Component } from 'react';

class Home extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      login_status: sessionStorage.getItem('login_status'),
      username: sessionStorage.getItem('username')
    }

    console.log(this.state) //'true' if logged in, null if not
  }

  // componentWillUnmount(){
  //   this.setUserStatus()
  // }

  // setUserStatus(){
  //   var userStatus = sessionStorage.getItem('login_status')
  //   console.log(userStatus)
  // }

  
  
  
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
      <div className='container'>
        <div className='header-container'>
          <div><h3 className='title'>HIKERRANK</h3></div> 
          <Nav />
          <Search />
          {renderLoginButton()}
          {renderSignupButton()}
          
        </div>

        <div className='main-content-container'>
          <div className='pic-slogan'>
          <img className='bg-image' src={homepagePic} width='100%'/>
            <h1 className='slogan'>Hit your stride on new trails</h1>
            <h3 className='sub-slogan'>Get on the trail with detailed maps shared by runners like you</h3>
          </div>

          <div>
            <h2 className='s-header'>Explore hiking trails in Pennsylvania:</h2>
          </div>

          <div class='search-criteria'>
              <PrettierSearch />
              <Filter />
          </div>

          <div className='map-container'>
            <div className="trail-info-box">
              <div className="nearby-hint">Trails near you:</div>
              <DisplayTrail />
            </div>
            <div className="mapbox">
              <img src={sampleMap} width='770px'></img>
            </div>
            
          </div>

            
        </div>

        <div className='footer-container'>
          
        </div>
        
      </div>
    );
  }
}

export default Home;


