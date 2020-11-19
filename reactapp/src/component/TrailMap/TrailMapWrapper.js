import React, { Component } from "react";
import './TrailMapWrapper.css'
import Map from './TrailMap.js'

class TrailMapWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        }
    }
    
    componentDidMount() {
        fetch(`/api/trail/${this.props.trail_id}/`)
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        const { error, isLoaded, items } = this.state
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            console.log('printing map data in TrailMapWrapper.js...')
            console.log(items)
            return <div className="test-map"><Map map_data={items} /></div>
        }
        
    }
}

export default TrailMapWrapper