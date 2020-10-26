import React, { Component } from 'react';
import './Login.css'
import LoginForm from './component/LoginForm'

class About extends Component {
    render() {
        return (
            <div>
                <div className="page-container">
                    <div className="logo-container">
                        <p className='hikerrank-title'>HIKERRANK</p>
                    </div>
                    <div className="login-box-container">
                        <div className="login-box">
                            <LoginForm />
                        </div>
                    </div>
                </div>
                {/* <img src={login_background}/> */}
            </div>
        );
    }
}

export default About;
