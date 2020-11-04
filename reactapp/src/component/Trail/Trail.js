import React, {Component} from "react";
import '../../App.css';
import './Trail.css';
import trailPagePic from '../../pictures/TrailPagePic.png';
import sampleMap from '../../pictures/sample-map.png'
import Nav from '../Nav'
import Search from '../Search'
import SignUpButton from '../Signup/SignUpButton'
import LoginButton from '../Login/LoginButton'


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

                <div className = 'main-content-container'>
                    <div className='pic-slogan'>
                    <img className='bg-image' src={trailPagePic} width='100%'/>
                        <h1 className='slogan'>Riverview Park Adventure</h1>
                        <h3 className='sub-slogan'>This is a scenic starting and ending at the Observatory, taking you past several key places and arround the park</h3>
                    </div>


                </div>

            </div>

        );
    }
}

export default Trail;