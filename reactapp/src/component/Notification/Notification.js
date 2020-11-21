import React, { Component } from 'react';
import Nav from '../Nav'
import Search from '../Search'
import CategoryTab from './category_tab'
import Calendar from 'react-calendar'
import SignUpButton from '../Signup/SignUpButton'
import LoginButton from '../Login/LoginButton'
import DropDownMenu from '../DropDownMenu'
import Footer from '../Footer'
import 'react-calendar/dist/Calendar.css'
import {Link} from "react-router-dom"

import './Notification.css'
 

class Notification extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          login_status: sessionStorage.getItem('login_status'),
          username: sessionStorage.getItem('username')
        }

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
                    <div><h3 className='title'><Link to='/'>HIKERRANK</Link></h3></div>
                    <Nav />
                    <Search />
                    {renderLoginButton()}
                    {renderSignupButton()}
                </div>

                <div className='notif-title'>
                    <h2>NOTIFICATION CENTER</h2>
                    <p>Check your new followers and events here</p>
                </div>

                <div className='notif-content'>
                    <div>
                        <CategoryTab />
                    </div>

                </div>

                <div className='calendar-container'>
                        <h3>Event Calendar</h3>
                    <div className="calendar-position">
                        <Calendar id="calendar"/>
                    </div>

                </div>

                <Footer />

            </div>
        );
    }
}


export default Notification;