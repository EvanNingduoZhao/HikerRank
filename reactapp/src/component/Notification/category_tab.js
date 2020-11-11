import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


class category_tab extends Component {
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