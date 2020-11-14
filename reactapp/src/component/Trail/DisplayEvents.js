import React, { Component } from 'react'
import axios from 'axios';
import calender from '../../pictures/calender.png'

class DisplayEvents extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            event_list:[],
            trail_id : this.props.trailId
        }
    }

    componentDidMount(){
        var list = new Array()
        axios.get(`http://127.0.0.1:8000/api/event/`)
        .then(res=>{
            console.log(res.data)
            var size = Object.keys(res.data).length
            for(let i=0;i<size;i++){
                const fetched_element = res.data[i]
                let fetched_trail_id = String(fetched_element.trail)
                let event_date=fetched_element.event_time.substring(0,10)
                let event_name=String(fetched_element.name)
                let participants_count = fetched_element.participants.length
                console.log(`event time is ${fetched_element.event_time.substring(0,10)}`)
                console.log(fetched_trail_id)
                console.log(`current trail id is: ${this.state.trail_id}`)
                if(fetched_trail_id===this.state.trail_id){
                    let fetched_user_id = String(fetched_element.initiator)
                    console.log(`The id of this user is ${fetched_user_id}`)
                    axios.get(`http://127.0.0.1:8000/api/user/${fetched_user_id}/`)
                    .then(res=>{
                        var event_dict = {}
                        event_dict['initiator_name']=res.data.username
                        event_dict['profile_url']=`/profile/${fetched_user_id}/`
                        event_dict['event_date']=event_date
                        event_dict['event_name']=event_name
                        event_dict['participants_count']=participants_count
                        list.push(event_dict)
                        console.log(event_dict)
                        this.setState({
                            event_list:list
                        })
                        console.log(this.state)
                    })
                }
            }
        })
    }
    
    render() {
        return (

            <div className='events-container'>
            <span className='section-header'>
                UPCOMING EVENTS: 
            </span>
            <span className='section-sub-header'>
                Join your hikers crew to go for a ride together
            </span>

            {
                this.state.event_list.map((element)=>{
                    return (
                        <div>
                            <div className='event'>
                                <img className='calender-pic'src={calender}/>
                    <div className='event-date-name'>{element.event_date} - {element.event_name}</div>
                    <div className='event-orgnizer'>
                        <span>Initiated by: </span>
                        <a href={element.profile_url}>{element.initiator_name}</a>
                    </div>
                    <div className='event-participants'>Current number of participants: {element.participants_count}</div>
                                <a className='see-participants-list' href=''>See participants list</a>
                                <button className='button join-event-button'>Join this event</button>
                            </div>
                            <hr></hr>
                        </div>
                    )
                })
            }
        </div>
        )
    }
}

export default DisplayEvents
