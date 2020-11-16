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
          my_event_list:[],
        }

    }
    

    componentDidMount(){
        // initiated event
        var my_event_list = new Array();
        fetch('/api/event/')
        .then(res => res.json())
        .then(data => {
            var data_size = Object.keys(data).length
            for (let index = 0; index < data_size; index++) {
                const element = data[index];
                if (element['initiator'].split("/").includes(String(this.state.id))) {
                    var my_event_dict = {}
                    my_event_dict['event_url'] = element['url']
                    my_event_dict['name'] = element['name']
                    my_event_dict['time'] = element['event_time']
                    my_event_list.push(my_event_dict)
                    this.setState({
                        ...this.state,
                        my_event_list: my_event_list
                    },console.log(this.state))
                }
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
                    <h4>You have not aplied for an event yet</h4>
                    </TabPanel>
                    <TabPanel>
                    <h4>You have not initiated an event yet</h4>
                    </TabPanel>
                    <TabPanel>
                    <h4>You have no event requests</h4>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default category_tab;