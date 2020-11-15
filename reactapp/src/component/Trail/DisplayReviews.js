import React, { Component } from 'react'
import axios from 'axios';
import CheckinButton from './CheckinButton'
import DisplayReviewUserName from './DisplayReviewUserName'
import reviewIcon from '../../pictures/reviewIcon.png'
import catPic from '../../pictures/catPic.png'
import AddReview from './AddReview'

class displayReviews extends Component {
    constructor(props) {
        super(props)
        this.state = {
             review_list:[],
             trail_id : this.props.trailId
        }
    }

    componentDidMount(){
        var list = new Array()
        axios.get(`/api/review/`)
        .then(res=>{
            console.log(res.data)
            var size = Object.keys(res.data).length
            for(let i=0;i<size;i++){
                const fetched_element = res.data[i]
                let fetched_trail_id = String(fetched_element.trail)
                let timestamp=fetched_element.time.substring(0,10)
                console.log(`timestamp is ${fetched_element.time.substring(0,10)}`)
                console.log(fetched_trail_id)
                console.log(`current trail id is: ${this.state.trail_id}`)
                if(fetched_trail_id.split("/").includes(String(this.state.trail_id))){
                    let profile_url_splitted_list=fetched_element.poster.split("/")
                    let fetched_user_id = String(profile_url_splitted_list[profile_url_splitted_list.length-2])
                    let review_text=fetched_element.Review_text
                    let review_rating=fetched_element.rating
                    console.log(`The id of this user is ${fetched_user_id}`)
                    var user_name = null;
                    axios.get(`/api/profile/${fetched_user_id}/`)
                    .then(res=>{
                        console.log(`the first fetch started`)
                        var review_dict = {}
                        review_dict['user_id']=fetched_user_id
                        review_dict['timestamp']=timestamp
                        review_dict['review_text']=review_text
                        review_dict['rating']=review_rating
                        console.log('the review dict is like this:')
                        console.log(review_dict)
                        review_dict['profile_url']=`/profile/${fetched_user_id}/`
                        review_dict['profile_pic_url']=res.data.picture
                        review_dict['user_name']=user_name
                        list.push(review_dict)
                        console.log(review_dict)
                        this.setState({
                            review_list:list
                        })
                        console.log(this.state)
                    })
                }
            }
        })
    }
    
    render() {
        return (
            <div className='review-section'>
                <p className='section-header review-section-header'>
                        REVIEW HIGHLIGHTS
                        <img src={reviewIcon}/>
                </p>
                <div className='review-container'>
                    {
                        this.state.review_list.map((element)=>{
                            console.log(`the user name is ${element.user_name}`)
                            return(
                                <div>
                                    <div className='review'>
                                        <img className='reviewer-profile-pic' src={element.profile_pic_url}/>
                                        {/* to get the username of the poster of a review requires making 
                                        a seperat axios request but making multiple axios requests in one 
                                        componentDidMount() function can cause the multiple axios requests
                                        executed in random orders thus may assign wrong usernames to reviews.
                                        To avoid this problem, I make DisplayReviewUserName a seperate component
                                        */}
                                        <DisplayReviewUserName user_id={element.user_id} profile_url={element.profile_url}/>
                                        <div className='post-time'>{element.timestamp}</div>
                                        <div className='review-rating'>{element.rating}</div>
                                        <p className='review-text'>{element.review_text}</p>
                                    </div>
                                    <hr></hr>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="add-new-review">
                    <AddReview trail_id={this.state.trail_id}/>
                </div>
            </div>
        )
    }
}

export default displayReviews


