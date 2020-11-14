import React, { Component } from 'react'
import checkMark from '../../pictures/checkMark.png'
import axios from 'axios';
import CheckinButton from './CheckinButton'

class displayCheckins extends Component {
    constructor(props) {
        super(props)
        this.state = {
             checkins_list:[],
             trail_id : this.props.trailId
        }
    }

    componentDidMount(){
        var list = new Array()
        axios.get(`http://127.0.0.1:8000/api/checkin/`)
        .then(res=>{
            console.log(res.data)
            var size = Object.keys(res.data).length
            for(let i=0;i<size;i++){
                const fetched_element = res.data[i]
                let fetched_trail_id = String(fetched_element.trail)
                let timestamp=fetched_element.Time.substring(0,10)
                console.log(`timestamp is ${fetched_element.Time.substring(0,10)}`)
                console.log(fetched_trail_id)
                console.log(`current trail id is: ${this.state.trail_id}`)
                if(fetched_trail_id===this.state.trail_id){
                    let fetched_user_id = String(fetched_element.User)
                    console.log(`The id of this user is ${fetched_user_id}`)
                    axios.get(`http://127.0.0.1:8000/api/user/${fetched_user_id}/`)
                    .then(res=>{
                        var checkin_dict = {}
                        checkin_dict['username']=res.data.username
                        checkin_dict['profile_url']=`/profile/${fetched_user_id}/`
                        checkin_dict['timestamp']=timestamp
                        list.push(checkin_dict)
                        console.log(checkin_dict)
                        this.setState({
                            checkins_list:list
                        })
                        console.log(this.state)
                    })
                }
            }
        })
    }
    
    render() {
        return (
            <div className='checkin-container'>
                <p className='section-header'>
                    RECENT CHECK-INS 
                    <img src={checkMark}/>
                </p>
                
                {
                    this.state.checkins_list.map((element)=>{
                        return(
                            <div className="user-checkin">
                                <a href={element.profile_url} >{element.username}</a>
                                <span> --- {element.timestamp}</span>
                                <br></br>
                            </div>
                        )
                    })
                }
                <CheckinButton trail_id= {this.state.trail_id}/>
            </div>
        )
    }
}

export default displayCheckins


