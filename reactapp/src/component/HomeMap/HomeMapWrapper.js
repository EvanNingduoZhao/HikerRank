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
            json_list: [],
        }
        this.getClickedTrail = this.getClickedTrail.bind(this)
    }
    
    componentDidMount() {
        fetch('/api/trail/')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
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

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidUpdate(prevProps) {
        console.log('HomeMapWrapper props.clicked', this.props.clicked, 'clicked trail', this.props.clicked_trail)
        if ((prevProps.clicked_trail != this.props.clicked_trail) && this.props.clicked) {
            console.log('HomeMapWrapper, componentDidUpdate, 2nd fetch')
            fetch(`/api/trail/${this.props.clicked_trail}/`)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log('HomeMapWrapper, componentDidUpdate, 2nd fetch', result)
                        this.setState({
                            clicked_trail: result,
                            clicked: true
                        })
                    },
                    (error) => {
                        this.setState({
                            clicked_trail: [],
                            clicked: false
                        })
                    }
                )
        }
    }

    async getClickedTrail() {
        if (this.props.clicked) {
            var selected_trail = [];
            await fetch(`/api/trail/${this.props.clicked_trail}/`)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log('HomeMapWrapper, fetch clicked trail', result);
                        selected_trail = result;
                    },
                    (error) => {
                        selected_trail = {'foo' : 'bar'};
                    }
                )
            console.log('HomeMapWrapper, fetch clicked trail', selected_trail);
            return selected_trail;
        } else {
            return {'foo':'bar'};
        }
    }

    render() {
        console.log('HomeMapWrapper', this.props);
        const { error, isLoaded, items, json_list } = this.state
        const clicked = this.state.clicked_trail
        console.log('HomeMapWrapper clicked trail', clicked)
        const click_flag = this.props.clicked;
        console.log('HomeMapWrapper click_flag', click_flag)
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return <div className="test-map"><Map map_json_list={json_list} clicked_trail={clicked} clicked={click_flag}/></div>
        }
        
    }
}

export default HomeMapWrapper