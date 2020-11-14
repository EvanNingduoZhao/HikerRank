import React, { Component } from 'react'
import axios from 'axios';

class CheckinButton extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             userId : sessionStorage.getItem('id'),
             trail_id:this.props.trail_id
        }
        console.log(this.state)
        console.log(`this trail id is: ${this.state.trail_id}`)
    }
    

    handleCheckin = (event)=>{
        return(
            axios.post('http://127.0.0.1:8000/api/checkin/',{
                trail:this.state.trail_id,
                User:this.state.userId
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
            <div>
                <form>
                    <button className='button' onClick={this.handleCheckin}>Check in here!</button>
                </form>
            </div>
        )
    }
}

export default CheckinButton
