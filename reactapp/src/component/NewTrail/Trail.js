import React, { Component } from 'react';
import Nav from '../Nav'
import Search from '../Search'
import SignUpButton from '../Signup/SignUpButton'
import LoginButton from '../Login/LoginButton'
import DropDownMenu from '../DropDownMenu'
import FetchTrail from './FetchTrail'
import FetchCheckin from './FetchCheckin'
import FetchReview from './FetchReview'
import sampleMap from '../../pictures/sample-map.png'
import checkMark from '../../pictures/checkMark.png'
import reviewIcon from '../../pictures/reviewIcon.png'
import './Trail.css'
import Footer from '../Footer';

class Trail extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          login_status: sessionStorage.getItem('login_status'),
          username: sessionStorage.getItem('username'),
          trail_id: this.props.match.params['id'],
          trail_name: "",
          trail_summary: "",
          trail_lon: null,
          trail_lat: null,

        }
    
        console.log(this.state) //'true' if logged in, null if not
    }

    componentDidMount(){
        const trail_api_url = '/api/trail/'+this.state.trail_id+'/'
        console.log(trail_api_url)
        fetch(trail_api_url)
        .then(res => res.json())
        .then(
            result =>{
                console.log(result);
                this.setState({
                    trail_name: result['name'],
                    trail_summary: result['summary'],
                    trail_lon: result['longitude'],
                    trail_lat: result['latitude'],
                    // length: result['length'],
                    // ascent: result['ascent'],
                    // descent: result['descent'],
                    // high_altitude: result['high_altitude'],
                    // low_altitude: result['low_altitude'],
                    // ratings: result['ratings']
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
            <div className="trail-container">
                <div className='header-container'>
                    <div><h3 className='title'>HIKERRANK</h3></div> 
                    <Nav />
                    <Search />
                    {renderLoginButton()}
                    {renderSignupButton()}
                    
                </div>

                <div className="trail-header">
                    <div className="trail-name-summary">
                        <h1>{this.state.trail_name}</h1>
                        <h3>{this.state.trail_summary}</h3>
                    </div>
                </div>

                <div className="trail-content">
                    <div className="trail-left">
                        <div className="trail-detail">
                            <h3>ABOUT THE TRAIL</h3>
                            <FetchTrail TrailID = {this.state.trail_id}/>
                        </div>

                        <div className="trail-checkins">
                            <div className="checkin-title">
                                <h3>RECENT CHECK-INS</h3>
                                <img src={checkMark}  width="30px" height="30px" className="checkmark"/>
                            </div>
                            
                            <FetchCheckin TrailID = {this.state.trail_id}/>
                            <button className="btn btn-primary" id="checkin-btn"> Check in here!</button>
                        </div>


                    </div>

                    <div className="trail-right">
                        <h3 className="trail-path-title">TRAIL PATH</h3>
                        <div className="path-map-container">
                            <img src={sampleMap} width='600px'></img>
                        </div>

                        <div className="review-title">
                            <h3>REVIEW HIGHLIGHTS</h3>
                            <img src={reviewIcon}  width="30px" height="30px" className="reviewIcon"/>
                            
                        </div>
                        <FetchReview TrailID = {this.state.trail_id}/>
                        
                        
                    </div>

                </div>

                <Footer />
                

            </div>
        );
    }
}

export default Trail;