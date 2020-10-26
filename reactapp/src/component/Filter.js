import React, { Component } from 'react';

class Filter extends Component {
    render() {
        return (
            <div className="trail-filter">
                <label className="filter-name" for="difficulty">Difficulty</label>
                <select className="filter-choice" name="difficulty" id="difficulty">
                    <option value="All">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Difficult">Difficult</option>
                </select>

                <label className="filter-name" for="distance">Distance</label>
                <select className="filter-choice" name="distance" id="distance">
                    <option value="All">All</option>
                    <option value="< 5 mi"> &lt; 5 mi</option>
                    <option value="5 ~ 10 mi">5 ~ 10 mi</option>
                    <option value="10 ~ 20 mi">10 ~ 20 mi</option>
                    <option value="20 ~ 40 mi">20 ~ 40 mi</option>
                    <option value="> 40 mi">&gt; 40 mi</option>
                </select>

                <label className="filter-name" for="trail-type">Trail Type</label>
                <select className="filter-choice" name="trail-type" id="trail-type">
                    <option value="All">All</option>
                    <option value="Narrow">Narrow</option>
                    <option value="Wide">Wide</option>
                    <option value="Paved">Paved Path</option>
                </select>

                <label className="filter-name" for="rating">Rating</label>
                <select className="filter-choice" name="rating" id="rating">
                    <option value="All">All</option>
                    <option value="0 ~ 1">0 ~ 1</option>
                    <option value="1 ~ 2">1 ~ 2</option>
                    <option value="2 ~ 3">2 ~ 3</option>
                    <option value="3 ~ 4">3 ~ 4</option>
                    <option value="4 ~ 5">4 ~ 5</option>
                </select>

                <button className="clear-filter">Clear Filter</button>
            </div>
        );
    }
}

export default Filter;