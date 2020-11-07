import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import history from "./history";
import {Redirect} from 'react-router-dom';
import './UserMenu.css';

class DropDownMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: { value: null, label: null }
        }
        this._onSelect = this._onSelect.bind(this)
    }

    
    _onSelect(option) {
        console.log('You selected ', option.value);
        this.setState({ 
            selected: { value: option.value, label: option.label } 
        });
        if (option.value == 1) {
            console.log('to homepage')
            console.log(this.state)
        } else if (option.value == 2) {
            console.log('to notification center')
        } else {
            console.log('log out')
        }
    }


    render() {

        const { toggleClassName, togglePlaholderClassName, toggleMenuClassName, toggleOptionsClassName } = this.state

        const options = [
            {value: 1, className: 'homepage-option',label: "My Homepage"}, 
            {value: 2, className: 'notif-option', label: "Notifications"}, 
            {value: 3, className: 'logout-option', label: "Logout"}, 
        ]

        const defaultOption = 'Actions'
        // const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

        return (
            <div className="user-options">
                <section>
                <Dropdown
                    options={options}
                    onChange={this._onSelect}
                    value={defaultOption}
                    placeholder="Select an option"
                    className={toggleClassName ? 'my-custom-class' : ''}
                    placeholderClassName={togglePlaholderClassName ? 'my-custom-class' : ''}
                    menuClassName={toggleMenuClassName ? 'my-custom-class' : ''}
                />
            </section>
            </div>     
        )
    }
}

export default DropDownMenu