import React from 'react';
import Modal from 'react-modal';
import ProfilePic from '../../pictures/profile-picture.png'
import './EditProfileButton.css'

export default props => {
  const {
    title, isOpen, askToClose,
    onAfterOpen, onRequestClose, onChangeInput
  } = props;

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
        <input id="edit-bio" onChange={onChangeInput} placeholder="Enter your description here..."/><br></br>
        <button className="btn btn-primary" >Submit</button>
      </form>
      <button className="close-edit-button" onClick={askToClose}>X close</button>
    </Modal>
  );
}
