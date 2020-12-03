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
    var searched_trails = new Array();
    // fetch('https://www.hikingproject.com/data/get-trails?lat=40.432756&lon=-79.924982&maxDistance=10&key=200958978-00d7024528a8bdd45c969fa078910537')
    fetch('/trail-list/?longtitude=-80.01&latitude=40.01&dislimit=50.0&type=backpack')
    .then(response => response.json())
    .then(data => {
        console.log('trail data');
        // console.log(data);
        var data_size = Object.keys(data).length
        for (let index = 0; index < data_size; index++) {
            const element = data[index]
            // console.log(element['tname'])
            searched_trails.push(element)
        }
        this.setState({
            page: 'homepage',
            trail_info: searched_trails
        }, console.log(this.state))
    })
    }

    handleClick(e) {
        // console.log(e.target.id)
        this.props.onClickTrailName(e.target.id)
    }
    
    render() {
        console.log('fetch result')
        console.log(this.state.trail_info)
        const clicked_trail_id = this.props.clicked_trail;
        console.log('Display Trail', clicked_trail_id)
        return (
            <div>
               {
                   this.state.trail_info.map((trail) => {
                       console.log(typeof(clicked_trail_id), typeof(trail.id))
                       var trail_id = String(trail['url']).split("/")[5];
                       var trail_types = 'hike/';
                       if (trail['backpack'] == 'Supported') {
                           trail_types = trail_types + 'backpack/'
                       }
                       if (trail['bicycle'] == 'Supported') {
                           trail_types = trail_types + 'bike/'
                       }
                       if (trail['mountainbike'] == 'Supported') {
                           trail_types = trail_types + 'mountainbike/'
                       }
                       if (trail['ski'] == 'Supported') {
                           trail_types = trail_types + 'ski/'
                       }
                       trail_types = trail_types.substring(0, trail_types.length-1)
                       if (clicked_trail_id == trail_id) {
                           
                            return (
                                <div key={trail.id} className="trail-card-clicked">
                                    {/* <p className="trail-name" onClick={this.handleClick} id={trail.id}>{trail.name}</p> */}
                                    <p className="trail-name" onClick={this.handleClick} id={trail_id}>{trail.tname}</p>
                                    <p>{trail.location}</p>
                                    <p>Type: {trail_types}</p>
                                    <p>Length: {trail.length} mi</p>
                                    <p>Width: {trail.width} feet</p>
                                    <p>Difficulty: {trail.difficulty} </p>
                                    {/* <p>Rating: {trail.stars} ({trail.starVotes})</p> */}
                                    
                                </div>
                            )
                       } else {
                            return (
                                <div key={trail_id} className="trail-card">
                                    {/* <p className="trail-name" onClick={this.handleClick} id={trail.id}>{trail.name}</p> */}
                                    <p className="trail-name" onClick={this.handleClick} id={trail_id}>{trail.tname}</p>
                                    <p>{trail.location}</p>
                                    <p>Type: {trail_types}</p>
                                    <p>Length: {trail.length} mi</p>
                                    <p>Width: {trail.width} feet</p>
                                    <p>Difficulty: {trail.difficulty} </p>
                                    {/* <p>Rating: {trail.stars} ({trail.starVotes})</p> */}
                                    
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