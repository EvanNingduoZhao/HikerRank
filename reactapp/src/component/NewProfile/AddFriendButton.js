import React, { Component } from 'react';

class AddFriendButton extends Component {
    constructor(props) {
        super(props);
        

    }

    // componentDidMount(){
    //     const api_url = '/api/profile/'+this.state.profile_id+'/'
    //     console.log(api_url)
    //     fetch(api_url)
    //     .then(res => res.json())
    //     .then(
    //         result =>{
    //             console.log(result['picture']);
    //             this.setState({
    //                 profile_bio:result['bio'],
    //                 profile_picture:result['picture']
    //             },()=>{console.log(this.state)})
    //         }
    //     )
    // }
    

    render() {
        // const renderButton = ()=>{
        //     if(this.p===sessionStorage.getItem('id')){
        //       return (
        //         <EditProfileButton profileId={this.state.profile_id} ini_picture={this.state.profile_picture}/>
        //       )
        //     } else {
        //       return (<AddFriendButton profileId={this.state.profile_id}/>)
        //     }
        //   }

        return (
            <div>
                <button className="btn btn-primary"> Add Friend</button>

            </div>
        );
    }
}

export default AddFriendButton;