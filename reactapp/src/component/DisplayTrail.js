import React, { Component } from 'react';


class DisplayTrail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          page: 'homepage',
          trail_info: []
        }
        this.fetchData = this.fetchData.bind(this)
        this.handleClick = this.handleClick.bind(this)
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

    handleClick(e) {
        // console.log(e.target.id)
        this.props.onClickTrailName(e.target.id)
    }
    
    render() {
        const clicked_trail_id = this.props.clicked_trail;
        console.log('Display Trail', clicked_trail_id)
        return (
            <div>
               {
                   this.state.trail_info.map((trail) => {
                       console.log(typeof(clicked_trail_id), typeof(trail.id))
                       if (clicked_trail_id == trail.id) {
                           
                            return (
                                <div key={trail.id} className="trail-card-clicked">
                                    {/* <p className="trail-name" onClick={this.handleClick} id={trail.id}>{trail.name}</p> */}
                                    <p className="trail-name" onClick={this.handleClick} id={trail.id}>{trail.name}</p>
                                    <p>{trail.location}</p>
                                    <p>Length: {trail.length} mi</p>
                                    <p>Difficulty: {trail.difficulty} </p>
                                    <p>Rating: {trail.stars} ({trail.starVotes})</p>
                                    
                                </div>
                            )
                       } else {
                            return (
                                <div key={trail.id} className="trail-card">
                                    {/* <p className="trail-name" onClick={this.handleClick} id={trail.id}>{trail.name}</p> */}
                                    <p className="trail-name" onClick={this.handleClick} id={trail.id}>{trail.name}</p>
                                    <p>{trail.location}</p>
                                    <p>Length: {trail.length} mi</p>
                                    <p>Difficulty: {trail.difficulty} </p>
                                    <p>Rating: {trail.stars} ({trail.starVotes})</p>
                                    
                                </div>
                            )
                       }
                       
                   })
               }
                {/* {this.state.trail_info.map(trail => <p key={trail.id}>{trail.name}</p>)} */}
            </div>
        );
    }
}

export default DisplayTrail;