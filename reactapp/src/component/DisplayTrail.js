import React, { Component } from 'react';

class DisplayTrail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          page: 'homepage',
          trail_info: ''
        }
        this.fetchData = this.fetchData.bind(this)
      }
    
    componentWillMount(){
    this.fetchData()
    }

    fetchData(){
    console.log('fetching')
    fetch('https://www.hikingproject.com/data/get-conditions?ids=7001635,7002742,7006663,7000108,7011192&key=YOUR_KEY_HERE')
    .then(response => response.json())
    .then(data => 
        this.setState({
        page: 'homepage',
        trail_info: data[0]['name']
        },()=>{console.log(data)})
        )
    }
    
    render() {
        return (
            <div>
                {this.state.trail_info}
            </div>
        );
    }
}

export default DisplayTrail;