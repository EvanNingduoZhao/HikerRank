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



class Trail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             trail:{}
        }
    }
    componentDidMount(){
        const trailID='7003964';
        axios.get(`http://127.0.0.1:8000/api/trail/${trailID}/`)
            .then(res=>{
                console.log("this is res")
                console.log(res.data)
                this.setState({
                    trail:res.data
                })
                console.log("this is the trail summary")
                console.log(this.state.trail.summary)
            })
        console.log(this.state.trail.name)
    }
    
    render() {
        return (
            <div className = 'trailpage-container'>
                <div className='trail-header-container'>
                    <div><h3 className='title'>HIKERRANK</h3></div> 
                    <Nav />
                    <Search />
                    <LoginButton />
                    <SignUpButton />
                </div>
                <PicSlogan name={this.state.trail.name} summary={this.state.trail.summary}/>
                <TrailInfo location={this.state.trail.location} 
                            length={this.state.trail.length}
                            high={this.state.trail.high_altitude}
                            low={this.state.trail.low_altitude}
                            difficulty={this.state.trail.difficulty}
                            rating={this.state.trail.ratings}
                />

                <div className='trail-map-container'>
                    <img src={sampleMap}/>
                </div>
                
                <div className='trail-checkin-container'>
                    <p className='trail-section-header'>
                        RECENT CHECK-INS 
                        <img src={checkMark}/>
                    </p>
                    <p className="trail-user-checkin">Username  --------  Check-in-time</p>
                    <p className="trail-user-checkin">Username  --------  Check-in-time</p>
                    <p className="trail-user-checkin">Username  --------  Check-in-time</p>
                    <p className="trail-user-checkin">Username  --------  Check-in-time</p>
                    <button className='button'>
                        Check in here!
                    </button>
                </div>

                <div className='trail-review-container'>
                    <p className='trail-section-header'>
                        REVIEW HIGHLIGHTS
                        <img src={reviewIcon}/>
                    </p>

                    <div className='trail-review'>
                        <img className='trail-reviewer-profile-pic' src={maleProfileIcon}/>
                        <div className='trail-username'>Username</div>
                        <div className='trail-post-time'>Time posted</div>
                        <div className='trail-review-rating'>Rating</div>
                        <p className='trail-review-text'>Comment area</p>
                    </div>
                    <hr></hr>
                    <div className='trail-review'>
                        <img className='trail-reviewer-profile-pic' src={femaleProfileIcon}/>
                        <div className='trail-username'>Username</div>
                        <div className='trail-post-time'>Time posted</div>
                        <div className='trail-review-rating'>Rating</div>
                        <p className='trail-review-text'>Comment area</p>
                    </div>
                    
                    <div className='trail-add-new-review'>
                        <img className='trail-add-review-profile-pic'src={catPic}/>
                        <p className='trail-add-review-text'>Comment area</p>
                        <button className='trail-add-review-button button'>
                            Add your review
                        </button>
                    </div>
                </div>

                <div className='trail-events-container'>
                    <span className='trail-section-header'>
                        UPCOMING EVENTS: 
                    </span>
                    <span className='trail-section-sub-header'>
                        Join your hikers crew to go for a ride together
                    </span>

                    <div className='trail-event'>
                        <img className='trail-calender-pic'src={calender}/>
                        <div className='trail-event-date-name'>Event Date - Event Name</div>
                        <div className='trail-event-orgnizer'>Initiated by: Username</div>
                        <div className='trail-event-participants'>Current number of participants: #</div>
                        <a className='trail-see-participants-list' href=''>See participants list</a>
                        <button className='trail-button join-event-button'>Join this event</button>
                    </div>

                    <hr></hr>
                    <div className='trail-event'>
                        <img className='trail-calender-pic'src={calender}/>
                        <div className='trail-event-date-name'>Event Date - Event Name</div>
                        <div className='trail-event-orgnizer'>Initiated by: Username</div>
                        <div className='trail-event-participants'>Current number of participants: #</div>
                        <a className='trail-see-participants-list' href=''>See participants list</a>
                        <button className='trail-button join-event-button'>Join this event</button>
                    </div>

                </div>

                <div className = 'trail-main-content-container'>
                    {/* <div className='pic-slogan-container'>
                        <img className='bg-image' src={trailPagePic} width='100%'/>
                        <h1 className='slogan'>Riverview Park Adventure</h1>
                        <h3 className='sub-slogan'>This is a scenic starting and ending at the Observatory, taking you past several key places and arround the park</h3>
                    </div> */}
                    {/* <div className='content-top-container'>

                    </div>
                    <div className='content-middle-container'>

                    </div>
                    <div className='content-buttom-container'>

                    </div> */}

                    {/* <TrailInfo/> */}
                </div>

            </div>

        );
    }
}

export default Trail;