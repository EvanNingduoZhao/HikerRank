import React, { Component } from 'react';

class Filter extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.handleClickSearch = this.handleClickSearch.bind(this)
        this.handleClickClear = this.handleClickClear.bind(this)
    }

    handleClickClear(e) {
        document.getElementById("name_filter").value = ""
        document.getElementById("difficulty_filter").value = "null"
        document.getElementById("maxLength_filter").value = ""
        document.getElementById("dislimit_filter").value = ""
        document.getElementById("type_filter").value = "null"
        var filters = {
            name: 'null',
            difficulty: 'null',
            type: 'null',
            maxLength: 'null',
            dislimit: 'null' 
        }
        this.props.onClickSearch(filters)
    }

    handleClickSearch(e) {
        // get all the filter inputs and pass to parent component
        var filters = {
            name: 'null',
            difficulty: 'null',
            type: 'null',
            maxLength: 'null',
            dislimit: 'null' 
        }
        var name = document.getElementById("name_filter").value
        var difficulty = document.getElementById("difficulty_filter").value
        var maxLength = document.getElementById("maxLength_filter").value
        var dislimit = document.getElementById("dislimit_filter").value
        var type = document.getElementById("type_filter").value

        filters.name = name
        filters.difficulty = difficulty
        filters.type = type
        if (maxLength !== '') {
            filters.maxLength = maxLength
        }
        if (dislimit !== '') {
            filters.dislimit = dislimit
        }
        console.log('filters get from Filter.js')
        console.log(filters)
        this.props.onClickSearch(filters)
    }

    render() {
        return (
            <div className="trail-filter">
                <label className="filter-name" for="name_filter">Trail Name</label>
                <input className="filter-choice" type="text" placeholder="Find trails by name" id="name_filter"/>
                
                <label className="filter-name" for="difficulty_filter">Difficulty</label>
                <select className="filter-choice" name="difficulty" id="difficulty_filter">
                    <option value="null">All</option>
                    <option value="Easiest">Easiest</option>
                    <option value="More Difficult">More Difficult</option>
                    <option value="Most Difficult">Most Difficult</option>
                </select>

                <label className="filter-name" for="maxLength_filter">Length</label>
                <input className="filter-choice" type="text" placeholder="trail max length in miles" id="maxLength_filter"/>
                {/* <select className="filter-choice" name="maxLength" id="maxLength_filter">
                    <option value="All">All</option>
                    <option value="< 2 mi"> &lt; 5 mi</option>
                    <option value="2 ~ 5 mi">5 ~ 10 mi</option>
                    <option value="5 ~ 20 mi">10 ~ 20 mi</option>
                    <option value="20 ~ 40 mi">20 ~ 40 mi</option>
                    <option value="> 40 mi">&gt; 40 mi</option>
                </select> */}

                <label className="filter-name" for="distance_filter">Distance</label>
                <input className="filter-choice" type="text" placeholder="distance to trail start" id="dislimit_filter"/>
                {/* <select className="filter-choice" name="distance" id="distance">
                    <option value="All">All</option>
                    <option value="< 10 mi"> &lt; 10 mi</option>
                    <option value="< 30 mi">&lt; 30 mi</option>
                    <option value="< 50 mi">&lt; 50 mi</option>
                    <option value="< 100 mi">&lt; 100 mi</option>
                    <option value="< 200 mi">&lt; 200 mi</option>
                </select> */}

                <label className="filter-name" for="type_filter">Trail Type</label>
                <select className="filter-choice" name="trail-type" id="type_filter">
                    <option value="null">All</option>
                    <option value="Backpack">Backpack</option>
                    <option value="Bicycle">Bicycle</option>
                    <option value="Mountainbike">Mountainbike</option>
                    <option value="Ski">Ski</option>
                </select>

                {/* <label className="filter-name" for="rating">Rating</label>
                <select className="filter-choice" name="rating" id="rating">
                    <option value="All">All</option>
                    <option value="0 ~ 1">0 ~ 1</option>
                    <option value="1 ~ 2">1 ~ 2</option>
                    <option value="2 ~ 3">2 ~ 3</option>
                    <option value="3 ~ 4">3 ~ 4</option>
                    <option value="4 ~ 5">4 ~ 5</option>
                </select> */}

                <button className="clear-filter" onClick={this.handleClickSearch}>Search</button>
                <button className="clear-filter" onClick={this.handleClickClear}>Clear Filter</button>
                {/* <button className="clear-filter">Show Trails on Map</button> */}
            </div>
        );
    }
}

export default Filter;