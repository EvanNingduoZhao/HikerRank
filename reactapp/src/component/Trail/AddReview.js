import React, { Component } from 'react'
import axios from 'axios';
import catPic from '../../pictures/catPic.png'

class AddReview extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             comment:'',
             userId : sessionStorage.getItem('id'),
             trail_id:this.props.trail_id,
             rating:''
        }
    }

    handleCommentChange = (event) =>{
        this.setState({
            comment:event.target.value
        })
    }

    handleRatingChange = (event) =>{
        this.setState({
            rating:event.target.value
        })
    }

    handleFormSubmit = (event) =>{
        return(
            axios.post('/api/review/',{
                trail:this.state.trail_id,
                poster:this.state.userId,
                rating:parseInt(this.state.rating),
                Review_text:this.state.comment
            })
            .then(response => {
                console.log(JSON.stringify(response))
            })
            .catch(error => {
                console.log(JSON.stringify(error.response))
            })
        )
    }
    
    render() {
        return (
            <div className='add-new-review'>
                <img className='add-review-profile-pic'src={catPic}/>
                <form onSubmit = {(event)=> this.handleFormSubmit(event)}>
                    <textarea className='add-review-text' value={this.state.comment} onChange={this.handleCommentChange}></textarea>
                    <span className="rating-label">
                        <label>Rating: </label>
                        <select value={this.state.rating} onChange={this.handleRatingChange}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </span>
                    <button type='submit' className='add-review-button button'>
                        Add your review
                    </button>
                </form>
            </div>
        )
    }
}

export default AddReview
