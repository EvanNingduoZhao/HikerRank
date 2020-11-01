import React, { Component } from 'react';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: '', 
        }
    }
    
    render() {
        return (
            <form method="post" className="signup-form">
                <input type="text" className="signup-input" name="username" placeholder="Username" required="required" />
                <input type="text" className="signup-input" name="email" placeholder="Password" required="required" />
                <input type="text" className="signup-input" name="password1" placeholder="Password" required="required" />
                <input type="text" className="signup-input" name="password2" placeholder="Confirm Password" required="required" />
                <br></br>
                <button type="submit" class="signup-btn">SIGN UP</button>
            </form>
        );
    }
}

export default SignupForm;