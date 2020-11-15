import React, { Component } from 'react'
import axios from 'axios';

class JoinEventButton extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            userId : sessionStorage.getItem('id'),
            event_id:this.props.event_id,
            participants:[]
        }
        console.log(this.state)
        console.log(`this event id is: ${this.state.event_id}`)
    }

    handleJoinEvent=(event)=>{
        console.log('Join event button just clicked')
        axios.get(`http://127.0.0.1:8000/api/event/${this.state.event_id}`)
        .then(res=>{
            console.log(res.data)
            this.setState({
                participants:res.data.participants
            })
        })
        return(
            axios.put(`http://127.0.0.1:8000/api/event/${this.state.event_id}`,{
                participants:this.state.participants.push(this.state.userId)
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
            <form className='join-event-button' onSubmit = {(event)=> this.handleJoinEvent(event)}>
                <button type='submit' className='button'>Join this Event</button>
            </form>
        )
    }
}

export default JoinEventButton
