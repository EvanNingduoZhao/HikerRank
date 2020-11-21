import React, {useState} from 'react';
import Modal from 'react-modal';

 function CancelEventModal(props) {
  
  const { isOpen, askToClose, onAfterOpen, onRequestClose, cancel_url} = props;

  const cancel = (event) => {
    fetch(cancel_url,{
      method: 'DELETE', 
    })
    .then(res =>{
      console.log(res)
    })
    .then(data => {
      console.log(data)
      alert("Event canceled")
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error: ', error)
    });
    
  }

  return (
    <Modal
      contentLabel="modalA"
      closeTimeoutMS={150}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      id="cancel-event-modal">
      <h3>Are you sure you want to cancel this event?</h3>
      <button className="btn btn-primary" onClick={(event)=> cancel()}>Yes</button>
      <button className="close-edit-button" onClick={askToClose}>X close</button>
    </Modal>
  );
}

export default CancelEventModal
