import React, { Component } from 'react';

class FetchCheckin extends Component {

    constructor(props) {
        super(props);
         this.state={
            trail_id: this.props.TrailID,
            list: []
         }
    }

    componentDidMount(){
        var list = new Array();
        const checkin_api_url = '/api/checkin/'
        console.log(checkin_api_url)
        fetch(checkin_api_url)
        .then(res => res.json())
        .then(
            data =>{
                var data_size = Object.keys(data).length
                for (let index = 0; index < data_size; index++) {
                    const element = data[index];
                    let fetched_trail_id = String(element['trail'])
                    let timestamp = String(element['Time']).substring(0,10)
                    if (fetched_trail_id.split("/").includes(String(this.state.trail_id))) {
                        let fetched_user_url = String(element['User']).replace("profile","user")
                        fetch(fetched_user_url)
                        .then(res => res.json())
                        .then(data => {
                            var name = data['username']
                            var id = data['id']
                            var profile_url = '/profile/'+String(id)+'/'
                            var user_dict = {}
                            user_dict['username'] = name
                            user_dict['profile_url'] = profile_url
                            user_dict['timestamp'] = timestamp
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
            <div>
                {
                    this.state.list.map(function(element,index){
                        return (
                            <div>
                                <a key={index} href={element['profile_url']} className="trail-checkin-list" >{element['username']}  ---  {element['timestamp']}</a>
                                <br></br>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default FetchCheckin;