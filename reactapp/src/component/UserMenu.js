import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import './UserMenu.css';
// import 'react-dropdown/style.css';
//https://github.com/fraserxu/react-dropdown/blob/master/style.css

class UserMenu extends Component {
   
    render() {
        const options = [
            'My Homepage', 
            'Notifications', 
            'Logout'
            ];
        const defaultOption = 'Action';
        return (
            <div className="user-options">
            <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
            </div>
        );
    }
  }


export default UserMenu;