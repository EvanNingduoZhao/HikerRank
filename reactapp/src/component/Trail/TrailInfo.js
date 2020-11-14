import React from 'react'

function TrailInfo(props) {
    return (
        <div className='Trail-Info-container'>
            <p className='section-header'>ABOUT THE TRAIL</p>
            <p>Location: {props.location}</p>
            <p>Length:{props.length} miles</p>
            <p>Elevation: high - {props.high} ft, low - {props.low} ft</p>
            <p>Difficulty: {props.difficulty}</p>
            <p>Other Information:</p>
            <p>Ratings: {props.rating}(10) <a href=''>Rate this trail</a></p>
        </div>
    )
}

export default TrailInfo

