import React, { Component } from 'react';
import './TrailInfo.css'

class TraiInfo extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             trailInfo:{}
        }
    }
    
    render() {
        return (
            <div>
                <p className='AboutTheTrail'>ABOUT THE TRAIL</p>
                <div className='TrailInfo'>
                    <p>Location:</p>
                    <p>Length:</p>
                    <p>Elevation:</p>
                    <p>Difficulty:</p>
                    <p>Other Information:</p>
                    <p>Ratings:</p>
                </div>
            </div>
        )
    }
}

export default TraiInfo
