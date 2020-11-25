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
import Footer from '../Footer'
import DropDownMenu from '../DropDownMenu'
import HomeMapWrapper from '../HomeMap/HomeMapWrapper'
import { geolocated } from "react-geolocated"


import React, { Component } from 'react';

class Home extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      login_status: sessionStorage.getItem('login_status'),
      username: sessionStorage.getItem('username'),
      clicked_trail: -1,
      clicked: false
    }
    this.handleClickTrailName = this.handleClickTrailName.bind(this)

    console.log(this.state) //'true' if logged in, null if not
    console.log(`the current loggedd in user is: ${sessionStorage.getItem('username')}`)
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      console.log("geolocation availabe");
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    } else {
      console.log("geolocation not available");
    }
  }
  
  handleClickTrailName(trail_id) {
    console.log('from Home Component', trail_id)
    if (trail_id == this.state.clicked_trail) {
      this.setState({
        clicked_trail: -1,
        clicked: false
      })
    } else {
      this.setState({
        clicked_trail: trail_id,
        clicked: true
      })
    }
  }
  
  render() {
    const clicked = this.state.clicked_trail
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

    const geolocation = ()=>{
      return !this.props.isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
      ) : !this.props.isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
      ) : this.props.coords ? (
        <table>
            <tbody>
                <tr>
                    <td>latitude</td>
                    <td>{this.props.coords.latitude}</td>
                </tr>
                <tr>
                    <td>longitude</td>
                    <td>{this.props.coords.longitude}</td>
                </tr>
                <tr>
                    <td>altitude</td>
                    <td>{this.props.coords.altitude}</td>
                </tr>
                <tr>
                    <td>heading</td>
                    <td>{this.props.coords.heading}</td>
                </tr>
                <tr>
                    <td>speed</td>
                    <td>{this.props.coords.speed}</td>
                </tr>
            </tbody>
        </table>
      ) : (
        <div>Getting the location data&hellip; </div>
      );
    }


    return (
      <div className='home-container'>
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
              <DisplayTrail clicked_trail={clicked} onClickTrailName={this.handleClickTrailName}/>
            </div>
            <div className="mapbox">
              {geolocation()}
              {/* <HomeMapWrapper clicked_trail={clicked} clicked={this.state.clicked}/> */}
              {/* <img src={sampleMap} width='770px'></img> */}
            </div>
            
          </div>

            
        </div>

        <div className='footer-container'>
          <Footer />
        </div>
        
      </div>
    );
  }
}

export default Home;


