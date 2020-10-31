import React, { Component } from 'react';

class LoginForm extends Component {
    render() {
        return (
            <form method="post" className="login-form">
                <input type="text" className="login-input" name="username" placeholder="Username" required="required" />
                <input type="text" className="login-input" name="password" placeholder="Password" required="required" />
                <br></br>
                <button type="submit" class="login-btn">LOGIN</button>
                <button type="submit" class="signup-btn">SIGN UP</button>
                <button type="submit" class="guest-btn">CONTINUE AS GUESTS</button>
            </form>
        );
    }
}

export default LoginForm;