import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


class category_tab extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          login_status: sessionStorage.getItem('login_status'),
          username: sessionStorage.getItem('username'),
          id: sessionStorage.getItem('id'),
          my_request_list:[],
          my_request_list_msg:null,
          my_event_list:[],
          my_event_list_msg: null,
          received_request_list:[],
          received_request_list_msg: null
        }

    }
    

    componentDidMount(){

        //my requests
        var my_request_list = new Array();
        fetch('/api/pending-request/')
        .then(res => res.json())
        .then(data => {
            var data_size = Object.keys(data).length
            var my_request_cnt = 0
            for (let index = 0; index < data_size; index++) {
                const element = data[index];
                if (element['user'].split("/").includes(String(this.state.id))){
                    my_request_cnt = my_request_cnt + 1
                    fetch(element['event']).then(res=>res.json())
                    .then(data => {
                        var my_request_dict = {}
                        my_request_dict['event_name'] = data['name']
                        my_request_dict['event_time'] = String(data['event_time']).substring(0,10)
                        my_request_list.push(my_request_dict)
                        this.setState({
                            ...this.state,
                            my_request_list: my_request_list,
                            my_request_list_msg: null
                        },console.log(this.state))
                    })
                }
            }
            if (my_request_cnt==1) {
                this.setState({
                    ...this.state,
                    my_request_list_msg: "You have not applied for an event yet"
                },console.log(this.state))
            }  
        })



        // initiated event
        var my_event_list = new Array();
        fetch('/api/event/')
        .then(res => res.json())
        .then(data => {
            var data_size = Object.keys(data).length
            var my_event_cnt = 0
            for (let index = 0; index < data_size; index++) {
                const element = data[index];
                if (element['initiator'].split("/").includes(String(this.state.id))) {
                    my_event_cnt = my_event_cnt + 1
                    var my_event_dict = {}
                    my_event_dict['event_url'] = element['url']
                    my_event_dict['name'] = element['name']
                    my_event_dict['time'] = String(element['event_time']).substring(0,10)
                    my_event_list.push(my_event_dict)
                    this.setState({
                        ...this.state,
                        my_event_list: my_event_list,
                        my_event_list_msg: null
                    },console.log(this.state))
                }
            }
            if (my_event_cnt===0) {
                this.setState({
                    ...this.state,
                    my_event_list_msg: "You have not initiated an event yet"
                },console.log(this.state))
            }  
        })

        //event request received
        var received_request_list = new Array();
        fetch('/api/pending-request/')
        .then(res => res.json())
        .then(data => {
            var data_size = Object.keys(data).length
            var received_request_cnt = 0
            for (let index = 0; index < data_size; index++) {
                const element = data[index];
                fetch(element['event']).then(res=>res.json())
                .then(data => {
                    var event_name = data['name']
                    if (data['initiator'].split("/").includes(String(this.state.id))){
                        received_request_cnt = received_request_cnt +1
                        var received_request_dict = {}
                        fetch(element['user']).then(res=>res.json())
                        .then(data=>{ 
                            received_request_dict['requester_name']=data['username']
                            received_request_dict['text'] = element['text']
                            received_request_dict['event_name'] = event_name
                            received_request_list.push(received_request_dict)
                            this.setState({
                                received_request_list: received_request_list,
                                received_request_list_msg: null
                            },console.log(this.state))
                        })
                    }
                })
            } 
            if (received_request_cnt===0) {
                this.setState({
                    ...this.state,
                    my_event_list_msg: "You have no event requests"
                },console.log(this.state))
            } 
        })
    }


    render() {
        return (
            <div>
                <Tabs>
                    <TabList>
                    <Tab>New Followers</Tab>
                    <Tab>Event Requested</Tab>
                    <Tab>Event Initiated by You</Tab>
                    <Tab>Event Requests Received</Tab>
                    </TabList>
                
                    <TabPanel>
                    <h4>You have no new followers</h4>
                    </TabPanel>

                    <TabPanel>
                    <h4>{this.state.my_request_list_msg}</h4>
                    <div id="my-request-table">
                        <table className="my-request-box">
                        {
                        this.state.my_request_list.map(function(element,index){
                            return (
                                <tr> <td className="my_event_name"><span className="bold-font">Event: </span><span>{element['event_name']}</span></td>
                                    <td className="my_event_date"><span className="bold-font">Event Date: </span><span>{element['event_time']}</span></td>
                                    <td><button id="cancel-request-btn" className="btn btn-primary"> Cancel</button></td>
                                </tr>
                            )
                        })
                        }
                        </table>
                    </div>
                    </TabPanel>

                    <TabPanel>
                    <h4>{this.state.my_event_list_msg}</h4>
                    <div id="my-event-table">
                        <table className="my-event-box">
                        {
                        this.state.my_event_list.map(function(element,index){
                            return (
                                <tr> <td className="my-event-name"><span>{element['name']}</span></td>
                                    <td className="my-event-time"><span>{element['time']}</span></td>
                                    <td><button id="edit-event-btn" className="btn btn-primary"> Edit</button></td>
                                </tr>
                            )
                        })
                        }
                        </table>
                    </div>
                    </TabPanel>

                    <TabPanel>
                    <h4>{this.state.received_request_list_msg}</h4>
                    <div id="received-request-table">
                        <table className="received-request-box">
                        {
                        this.state.received_request_list.map(function(element,index){
                            return (
                                <div className="received-request-content">
                                <tr>
                                    <td className="request-event-name"><span className="bold-font">Event: </span><span>{element['event_name']}</span></td>
                                    <td className="requester-name"><span className="bold-font">From: </span><span>{element['requester_name']}</span></td>
                                    <td><button className="btn btn-primary"> Accept</button></td>
                                    <td><button id="decline-request-btn" className="btn btn-primary"> Decline</button></td>
                                </tr>
                                <tr className="request-text"><td colSpan="4"><span className="bold-font">Message to you: </span>{element['text']}</td></tr>
                                </div>
                               
                            )
                        })
                        }
                        </table>
                    </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default category_tab;