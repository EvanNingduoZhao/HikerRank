import React, { Component } from 'react';

class FetchReview extends Component {

    constructor(props) {
        super(props);
         this.state={
            trail_id: this.props.TrailID,
            list: []
         }
    }

    componentDidMount(){
        var list = new Array();
        const review_api_url = '/api/review/'
        console.log(review_api_url)
        fetch(review_api_url)
        .then(res => res.json())
        .then(
            data =>{
                var data_size = Object.keys(data).length
                for (let index = 0; index < data_size; index++) {
                    const element = data[index];
                    let fetched_trail_id = String(element['trail'])
                    let fetched_profile_id = String(element['poster'])
                    if (fetched_trail_id.split("/").includes(String(this.state.trail_id))) {
                        var profile_picture = null;
                        fetch(fetched_profile_id)
                        .then(res => res.json())
                        .then(data => {
                            profile_picture = data['picture']
                        })

                        let fetched_user_url = String(element['poster']).replace("profile","user")
                        fetch(fetched_user_url)
                        .then(res => res.json())
                        .then(data => {
                            var name = data['username']
                            var id = data['id']
                            var profile_url = '/profile/'+String(id)+'/'
                            var user_dict = {}
                            user_dict['username'] = name
                            user_dict['profile_url'] = profile_url
                            user_dict['timestamp'] = String(element['time']).substring(0,10)
                            user_dict['rating'] = element['rating']
                            user_dict['text'] = element['Review_text']
                            user_dict['picture'] = profile_picture
                            list.push(user_dict)
                            this.setState({
                                ...this.state,
                                list: list
                            },console.log(this.state))
                        })
                    }
                }  
            }
        )
    }

    render() {
        return (
        <div className="reviews-box">
            {
                this.state.list.map(function(element,index){
                    return (
                        <div className="detail-review-box">
                            <div className="detail-review-box-left">
                                <img src={element['picture']} alt="image" width="70px" ></img>
                            </div>
                            <div className="detail-review-box-right">
                                <h3>{element['username']}</h3>
                                <span>{element['timestamp']}          </span>
                                <span>Rating: {element['rating']}  </span>
                                <p className="review-text">{element['text']}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        );
    }
}

export default FetchReview;