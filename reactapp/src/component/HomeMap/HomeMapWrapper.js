import React, { Component } from "react";
import './HomeMapWrapper.css'
import Map from './HomeMap.js'

class HomeMapWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            json_list: []
        }
    }
    
    componentDidMount() {
        fetch('/api/trail/')
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result,
                        json_list: result
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
        const { error, isLoaded, items, json_list } = this.state
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    {/* <h1>Test Map Features Here</h1>
                    <div>
                        {items.map(item => (
                            <p>{item.map_info.type}</p>
                        ))}
                    </div> */}
                    <div className="test-map">
                        <Map map_json_list={json_list} />
                    </div>
                </div>
            )
        }
        
    }
}

export default HomeMapWrapper