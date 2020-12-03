import React, { Component } from 'react';

class Filter extends Component {
    render() {
        return (
            <div className="trail-filter">
                <label className="filter-name" for="name_search">Trail Name</label>
                <input type="text" placeholder="Find trails by name" id="name_search"/>
                
                <label className="filter-name" for="difficulty">Difficulty</label>
                <select className="filter-choice" name="difficulty" id="difficulty">
                    <option value="All">All</option>
                    <option value="Easiest">Easiest</option>
                    <option value="More Difficult">More Difficult</option>
                    <option value="Most Difficult">Most Difficult</option>
                </select>

                <label className="filter-name" for="maxLength">Length</label>
                <select className="filter-choice" name="maxLength" id="maxLength">
                    <option value="All">All</option>
                    <option value="< 2 mi"> &lt; 5 mi</option>
                    <option value="2 ~ 5 mi">5 ~ 10 mi</option>
                    <option value="5 ~ 20 mi">10 ~ 20 mi</option>
                    <option value="20 ~ 40 mi">20 ~ 40 mi</option>
                    <option value="> 40 mi">&gt; 40 mi</option>
                </select>

                <label className="filter-name" for="trail-type">Trail Type</label>
                <select className="filter-choice" name="trail-type" id="trail-type">
                    <option value="All">All</option>
                    <option value="Backpack">Backpack</option>
                    <option value="Bicycle">Bicycle</option>
                    <option value="Mountainbike">Moutainbike</option>
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

                <button className="clear-filter">Search</button>
                <button className="clear-filter">Clear Filter</button>
                <button className="clear-filter">Show Trails on Map</button>
            </div>
        );
    }
}

export default Filter;