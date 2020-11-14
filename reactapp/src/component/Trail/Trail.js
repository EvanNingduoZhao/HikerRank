import React, {Component} from "react";
import '../../App.css';
import './Trail.css';
// import trailPagePic from '../../pictures/TrailPagePic.png';
import sampleMap from '../../pictures/sample-map.png'
import checkMark from '../../pictures/checkMark.png'
import reviewIcon from '../../pictures/reviewIcon.png'
import maleProfileIcon from '../../pictures/maleProfileIcon.png'
import femaleProfileIcon from '../../pictures/femaleProfileIcon.png'
import catPic from '../../pictures/catPic.png'
import calender from '../../pictures/calender.png'
import Nav from '../Nav'
import Search from '../Search'
import SignUpButton from '../Signup/SignUpButton'
import LoginButton from '../Login/LoginButton'
import axios from 'axios';
import PicSlogan from './PicSlogan';
import TrailInfo from './TrailInfo';
import DropDownMenu from '../DropDownMenu'
import DisplayCheckins from "./DisplayCheckins";
import DisplayReviews from "./DisplayReviews"
import DisplayEvents from './DisplayEvents'




class Trail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            login_status: sessionStorage.getItem('login_status'),
            username: sessionStorage.getItem('username'),
            trail:{},
            checkins:{},
            trail_id:this.props.match.params['id']
        }
        console.log(`the current loggedd in user is: ${sessionStorage.getItem('username')}`)
    }
    // componentWillMount(){
    //     const trailID='7003964';
    //     axios.get(`http://127.0.0.1:8000/api/trail/${trailID}/`)
    //         .then(res=>{
    //             console.log(res.data)
    //             this.setState({
    //                 trail:res.data,
    //                 trail_id:res.data.id
    //             })
    //         })
    // }
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/api/trail/${this.state.trail_id}/`)
            .then(res=>{
                console.log(res.data)
                this.setState({
                    trail:res.data,
                })
            })
        axios.get(`http://127.0.0.1:8000/api/checkin/`)
            .then(res=>{
                this.setState({
                    checkins:res.data.filter(a=>a.trail==this.state.trail_id)
                })
                console.log(this.state.checkins)
            })
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
            <div className = 'container'>
                <div className='header-container'>
                    <div><h3 className='title'>HIKERRANK</h3></div> 
                    <Nav />
                    <Search />
                    {renderLoginButton()}
                    {renderSignupButton()}
                </div>
                <PicSlogan name={this.state.trail.name} summary={this.state.trail.summary}/>
                <TrailInfo location={this.state.trail.location} 
                            length={this.state.trail.length}
                            high={this.state.trail.high_altitude}
                            low={this.state.trail.low_altitude}
                            difficulty={this.state.trail.difficulty}
                            rating={this.state.trail.ratings}
                />

                <div className='map-container'>
                    <img src={sampleMap}/>
                </div>

                <DisplayCheckins trailId = {this.state.trail_id}/>
                
                {/* <div className='checkin-container'>
                    <p className='section-header'>
                        RECENT CHECK-INS 
                        <img src={checkMark}/>
                    </p>
                    <p className="user-checkin">Username  --------  Check-in-time</p>
                    <p className="user-checkin">Username  --------  Check-in-time</p>
                    <p className="user-checkin">Username  --------  Check-in-time</p>
                    <p className="user-checkin">Username  --------  Check-in-time</p>
                    <CheckinButton traiId= {this.state.trail.id}/>
                    <button className='button'>
                        Check in here!
                    </button>
                </div> */}
                {/* <div className='review-container'>
                    <p className='section-header'>
                        REVIEW HIGHLIGHTS
                        <img src={reviewIcon}/>
                    </p>

                    <div className='review'>
                        <img className='reviewer-profile-pic' src={maleProfileIcon}/>
                        <div className='username'>Username</div>
                        <div className='post-time'>Time posted</div>
                        <div className='review-rating'>Rating</div>
                        <p className='review-text'>Comment area</p>
                    </div>
                    <hr></hr>
                    <div className='review'>
                        <img className='reviewer-profile-pic' src={femaleProfileIcon}/>
                        <div className='username'>Username</div>
                        <div className='post-time'>Time posted</div>
                        <div className='review-rating'>Rating</div>
                        <p className='review-text'>Comment area</p>
                    </div>
                    
                    <div className='add-new-review'>
                        <img className='add-review-profile-pic'src={catPic}/>
                        <p className='add-review-text'>Comment area</p>
                        <button className='add-review-button button'>
                            Add your review
                        </button>
                    </div>
                </div> */}
                <DisplayReviews trailId = {this.state.trail_id}/>

                {/* <div className='events-container'>
                    <span className='section-header'>
                        UPCOMING EVENTS: 
                    </span>
                    <span className='section-sub-header'>
                        Join your hikers crew to go for a ride together
                    </span>

                    <div className='event'>
                        <img className='calender-pic'src={calender}/>
                        <div className='event-date-name'>Event Date - Event Name</div>
                        <div className='event-orgnizer'>Initiated by: Username</div>
                        <div className='event-participants'>Current number of participants: #</div>
                        <a className='see-participants-list' href=''>See participants list</a>
                        <button className='button join-event-button'>Join this event</button>
                    </div>

                    <hr></hr>
                    <div className='event'>
                        <img className='calender-pic'src={calender}/>
                        <div className='event-date-name'>Event Date - Event Name</div>
                        <div className='event-orgnizer'>Initiated by: Username</div>
                        <div className='event-participants'>Current number of participants: #</div>
                        <a className='see-participants-list' href=''>See participants list</a>
                        <button className='button join-event-button'>Join this event</button>
                    </div>

                </div> */}
                <DisplayEvents trailId = {this.state.trail_id}/>


            </div>

        );
    }
}

export default Trail;