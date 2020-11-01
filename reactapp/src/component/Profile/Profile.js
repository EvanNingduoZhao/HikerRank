import React, {Component} from "react";
import './Profile.css'
import pic from '../../pictures/defaultprofilepic.jpg'
import trailpic1 from '../../pictures/trailpic1.jpeg'
import trailpic2 from '../../pictures/trailpic2.jpeg'

class Profile extends Component {
    render() {
        return (
            <div>
                <div className="profile-container">
                    <p className='profile-hikerrank-title'>HIKERRANK</p>
                    <div className="left">
                        <img className="profilePic" src={pic} />
                        <div className="profile">
                            <div className="bioBox">
                                <p className="bio">Welcome to your profile page! Update profile for adding self introduction and profile photo</p>
                            </div>
                        </div>
                        <button className="updateButton">Update Profile</button>
                        <p className="friends">Friends</p>
                        <div className="friendInfo">
                            <p className="friendName">Apple</p>
                            <p className="friendName">Banana</p>
                            <p className="friendName">Cherry</p>
                        </div>
                        <p className="trails">Checked In Trails</p>
                        <div className="trailInfo">
                            <p className="trailName">Trail1</p>
                            <p className="trailName">Trail2</p>
                            <p className="trailName">Trail3</p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="post">
                            <img className="postPic" src={trailpic1} />
                            <p className="postText">One way to the end...</p>
                            <a className="trailLink">Trail1</a>
                        </div>
                        <div className="post">
                            <img className="postPic" src={trailpic2} />
                            <p className="postText">Look around myself...</p>
                            <a className="trailLink">Trail2</a>
                        </div>
                        <button className="addPost">Add post</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;