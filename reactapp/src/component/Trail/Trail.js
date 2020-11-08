import React, {Component} from "react";
import '../../App.css';
import './Trail.css';
import trailPagePic from '../../pictures/TrailPagePic.png';
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
import TrailInfo from './TrailInfo'


class Trail extends Component {
    render() {
        return (
            <div className = 'container'>
                <div className='header-container'>
                    <div><h3 className='title'>HIKERRANK</h3></div> 
                    <Nav />
                    <Search />
                    <LoginButton />
                    <SignUpButton />
                </div>

                <div className='pic-slogan-container'>
                        <img className='bg-image' src={trailPagePic} width='100%'/>
                        <h1 className='slogan'>Riverview Park Adventure</h1>
                        <h3 className='sub-slogan'>This is a scenic starting and ending at the Observatory, taking you past several key places and arround the park</h3>
                </div>

                <div className='Trail-Info-container'>
                    <p className='section-header'>ABOUT THE TRAIL</p>
                    <p>Location: Millvale, Pennsylvania</p>
                    <p>Length:3.1 miles</p>
                    <p>Elevation: high - 1213 ft, low - 874 ft</p>
                    <p>Difficulty: Medium</p>
                    <p>Other Information:</p>
                    <p>Ratings: 3.5(10) <a href=''>Rate this trail</a></p>
                </div>

                <div className='map-container'>
                    <img src={sampleMap}/>
                </div>
                
                <div className='checkin-container'>
                    <p className='section-header'>
                        RECENT CHECK-INS 
                        <img src={checkMark}/>
                    </p>
                    <p className="user-checkin">Username  --------  Check-in-time</p>
                    <p className="user-checkin">Username  --------  Check-in-time</p>
                    <p className="user-checkin">Username  --------  Check-in-time</p>
                    <p className="user-checkin">Username  --------  Check-in-time</p>
                    <button className='button'>
                        Check in here!
                    </button>
                </div>

                <div className='review-container'>
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
                </div>

                <div className='events-container'>
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

                </div>

                <div className = 'main-content-container'>
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