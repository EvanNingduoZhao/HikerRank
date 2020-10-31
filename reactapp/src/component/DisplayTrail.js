import React, { Component } from 'react';


class DisplayTrail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          page: 'homepage',
          trail_info: []
        }
        this.fetchData = this.fetchData.bind(this)
      }
    
    componentWillMount(){
    this.fetchData()
    }

    fetchData(){
    console.log('fetching')
    fetch('https://www.hikingproject.com/data/get-trails?lat=40.432756&lon=-79.924982&maxDistance=10&key=200958978-00d7024528a8bdd45c969fa078910537')
    .then(response => response.json())
    .then(json => 
        this.setState({
            page: 'homepage',
            trail_info: json.trails
        },()=>{console.log(json.trails)})
        )
    }
    
    render() {
        return (
            <div>
               {
                   this.state.trail_info.map((trail) => {
                       return (
                           <div key={trail.id} className="trail-card">
                               <p className="trail-name">{trail.name}</p>
                               <p>{trail.location}</p>
                               <p>Length: {trail.length} mi</p>
                               <p>Difficulty: {trail.difficulty} </p>
                               <p>Rating: {trail.stars} ({trail.starVotes})</p>
                               
                           </div>

                        
                       )
                   })
               }
                {/* {this.state.trail_info.map(trail => <p key={trail.id}>{trail.name}</p>)} */}
            </div>
        );
    }
}

export default DisplayTrail;