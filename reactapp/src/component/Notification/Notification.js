import React, { Component } from 'react';
import Nav from '../Nav'
import Search from '../Search'
import CategoryTab from './category_tab'
import Calendar from 'react-calendar'
import Footer from '../Footer'
import 'react-calendar/dist/Calendar.css';

import './Notification.css'
 

class Notification extends Component {
    render() {
        return (
            <div>
                <div className='header-container'>
                    <div><h3 className='title'>HIKERRANK</h3></div> 
                    <Nav />
                    <Search />
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
                        <Calendar className="calendar" />
                    </div>

                </div>

                <Footer />

            </div>
        );
    }
}


export default Notification;