import React, { Component } from 'react';

const Nav = () => {
    //props is an immutable object: can't do props.name = "xxx"
    return (
        // can return only one html element
        <div className='nav-bar'>
             <button class='nav_button' id="trail-guide">Trail Guide</button>
             <button class='nav_button' id="top-hikes">Top Hikes</button>
             <button class='nav_button' id="about-us">About Us</button>
        </div>
    )
}

export default Nav;