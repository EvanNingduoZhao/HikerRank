import '../../App.css';
import './Home.css';
import homepagePic from '../../pictures/homepage_pic.jpg';
import sampleMap from '../../pictures/sample-map.png'
import Nav from '../Nav'
import Search from '../Search'
import SignUpButton from '../Signup/SignUpButton'
import LoginButton from '../Login/LoginButton'
import DisplayTrail from '../DisplayTrail'
import PrettierSearch from '../PrettierSearch'
import Filter from '../Filter'
import SampleMap from '../SampleMap'


import React, { Component } from 'react';

class Home extends Component {
  
  render() {
    return (
      <div className='container'>
        <div className='header-container'>
          <div><h3 className='title'>HIKERRANK</h3></div> 
          <Nav />
          <Search />
          <LoginButton />
          <SignUpButton />
        </div>

        <div className='main-content-container'>
          <div className='pic-slogan'>
          <img className='bg-image' src={homepagePic} width='100%'/>
            <h1 className='slogan'>Hit your stride on new trails</h1>
            <h3 className='sub-slogan'>Get on the trail with detailed maps shared by runners like you</h3>
          </div>

          <div>
            <h2 className='s-header'>Explore hiking trails in Pennsylvania:</h2>
          </div>

          <div class='search-criteria'>
              <PrettierSearch />
              <Filter />
          </div>

          <div className='map-container'>
            <div className="trail-info-box">
              <div className="nearby-hint">Trails near you:</div>
              <DisplayTrail />
            </div>
            <div className="mapbox">
                {/* <img src={sampleMap} width='770px'></img> */}
                <SampleMap />
            </div>
            
          </div>

            
        </div>

        <div className='footer-container'>

        </div>
        
      </div>
    );
  }
}

export default Home;


