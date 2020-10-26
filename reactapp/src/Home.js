// import React from 'react';

// export default function Home() {
//     return (
//         <div>
//             <h1>Home</h1>
//         </div>
//     )
// }

import './App.css';
import './Home.css';
import homepagePic from './pictures/homepage_pic.jpg';
import Nav from './component/Nav'
import Search from './component/Search'
import SignIn from './component/SignIn'
import DisplayTrail from './component/DisplayTrail'
import PrettierSearch from './component/PrettierSearch'
import Filter from './component/Filter'


import React, { Component } from 'react';

class Home extends Component {
  
  render() {
    return (
      <div className='container'>
        <div className='header-container'>
          <div><h3 className='title'>HIKERRANK</h3></div> 
          <Nav />
          <Search />
          <SignIn />
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

          {/* <DisplayTrail /> */}
          <div class='search-criteria'>
              <PrettierSearch />
              <Filter />
          </div>

          <div class='map-container'>
          </div>

            
        </div>

        <div className='footer-container'>

        </div>
        
      </div>
    );
  }
}

export default Home;


