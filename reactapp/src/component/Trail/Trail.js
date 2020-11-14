import React, {Component} from "react";
import '../../App.css';
import './Trail.css';
// import trailPagePic from '../../pictures/TrailPagePic.png';
import sampleMap from '../../pictures/sample-map.png'
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
    
                <DisplayReviews trailId = {this.state.trail_id}/>

                <DisplayEvents trailId = {this.state.trail_id}/>


            </div>

        );
    }
}

export default Trail;