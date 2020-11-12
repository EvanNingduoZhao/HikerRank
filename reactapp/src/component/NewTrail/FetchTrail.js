import React, { Component } from 'react';

class FetchTrail extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            trail_id: this.props.TrailID,
            name: "",
            summary: "",
            difficulty: "",
            location: "",
            longitude: null,
            latitude: null,
            length: null,
            ascent:null,
            descent: null,
            high_altitude: null,
            low_altitude: null,
            ratings: null
        }
    }

    componentDidMount(){
        const trail_api_url = '/api/trail/'+this.state.trail_id+'/'
        console.log(trail_api_url)
        fetch(trail_api_url)
        .then(res => res.json())
        .then(
            result =>{
                console.log(result);
                this.setState({
                    name: result['name'],
                    summary: result['summary'],
                    difficulty: result['difficulty'],
                    location: result['location'],
                    longitude: result['longitude'],
                    latitude: result['latitude'],
                    length: result['length'],
                    ascent: result['ascent'],
                    descent: result['descent'],
                    high_altitude: result['high_altitude'],
                    low_altitude: result['low_altitude'],
                    ratings: result['ratings']
                },()=>{console.log(this.state)})
            }
        )
    }
    
    render() {
        return (
            <div className="detail-info-box">
                <p>Trail ID: {this.state.trail_id}</p>
                <span className="detail-trail-info">Location: {this.state.location}</span><br></br>
                <span className="detail-trail-info">Length: {this.state.length} miles</span><br></br>
                <span className="detail-trail-info">Elevation high: {this.state.high_altitude} ft</span><br></br>
                <span className="detail-trail-info">Elevation low: {this.state.low_altitude} ft</span><br></br>
                <span className="detail-trail-info">Ascent: {this.state.ascent}</span><br></br>
                <span className="detail-trail-info">Descent: {this.state.descent}</span><br></br>
                <span className="detail-trail-info">Difficulty: {this.state.difficulty}</span><br></br>
                <span className="detail-trail-info">Rating: {this.state.ratings}</span><br></br>
            </div>
        );
    }
}

export default FetchTrail;