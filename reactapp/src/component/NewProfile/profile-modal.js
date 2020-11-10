import React, {useState} from 'react';
import Modal from 'react-modal';
import ProfilePic from '../../pictures/profile-picture.png'
import './EditProfileButton.css'

 function ProfileModal(props) {
  
  const {
    title, isOpen, askToClose,
    onAfterOpen, onRequestClose, onChangeInput,profileId
  } = props;

  const [bio, setBio] = useState("");
  const [picture, setPicture] = useState();


  const being_update = false

  const updateProfile = () => {
    const uploadData = new FormData();

    uploadData.append('picture',picture, picture.name)
    uploadData.append('bio',bio)
    uploadData.append('user',profileId)
    // uploadData.append('username',sessionStorage.getItem('username'))
    alert(`${profileId}`)
    // var profile_url = '/api/profile/'+profileId+'/'
    fetch('/api/profile/',{
      method: 'POST', 
      body: uploadData
    })
    .then(res =>{
      alert(`${res}`)
      console.log(res);
      sessionStorage.setItem('stay_open','false')
    })
    .catch(error => {
      console.log(error)
      alert(`${error}`)
      sessionStorage.setItem('stay_open','true')
    })

  }

  return (
    <Modal
      contentLabel="modalA"
      closeTimeoutMS={150}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      id="profile-modal">
      <h3>Edit Profile</h3>
      <img src={ProfilePic} width="170px"></img>
      <form className="edit-profile-form">
        <input id="edit-bio" type="text" onChange={(event) => setBio(event.target.value)} placeholder="Enter your description here..."/><br></br>
        <input type="file"  accept="image/png, image/jpeg, image/png" onChange={(event) => setPicture(event.target.files[0])}></input>
        <button className="btn btn-primary" onClick={()=> updateProfile()}>Submit</button>
      </form>
      <button className="close-edit-button" onClick={askToClose}>X close</button>
    </Modal>
  );
}

export default ProfileModal
