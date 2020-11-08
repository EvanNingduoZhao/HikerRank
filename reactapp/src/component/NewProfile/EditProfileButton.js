import React, { Component }from 'react';
import Modal from 'react-modal';
import MyModal from './profile-modal';

const MODAL_A = 'modal_a';

class EditProfileButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentModal: null
        };
      }
    
      toggleModal = key => event => {
        event.preventDefault();
        if (this.state.currentModal) {
          this.handleModalCloseRequest();
          return;
        }
    
        this.setState({
          ...this.state,
          currentModal: key,
        });
      }
    
      handleModalCloseRequest = () => {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        this.setState({
          ...this.state,
          currentModal: null
        });
      }
    
      handleInputChange = e => {
        let text = e.target.value;
        if (text == '') {
        }
        this.setState({ ...this.state});
      }
    
      handleOnAfterOpenModal = () => {
        // when ready, we can access the available refs.
        this.heading && (this.heading.style.color = '#F00');
      }

    render() {
        const { currentModal } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this.toggleModal(MODAL_A)}>Edit Profile</button>
                <MyModal
                    title={this.state.title1}
                    isOpen={currentModal == MODAL_A}
                    onAfterOpen={this.handleOnAfterOpenModal}
                    onRequestClose={this.handleModalCloseRequest}
                    askToClose={this.toggleModal(MODAL_A)}
                    onChangeInput={this.handleInputChange} />
            </div>
        );
    }
}

// function EditProfileButton() {
//     // Get the modal
//     var modal = document.getElementById("myModal");

//     // Get the button that opens the modal
//     var btn = document.getElementById("myBtn");

//     // Get the <span> element that closes the modal
//     var span = document.getElementsByClassName("close")[0];

//     // When the user clicks on the button, open the modal
//     btn.onclick = function() {
//         modal.style.display = "block";
//     }

//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function() {
//     modal.style.display = "none";
//     }

//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
//     }

  
//     return (
//       <div>
//         <button id="myBtn">Open Modal</button>

//         <div id="myModal" class="modal">
//             <div class="modal-content">
//                 <span class="close">&times;</span>
//                 <p>Some text in the Modal..</p>
//             </div>
//         </div>
//       </div>
//     );
//   }
  
  export default EditProfileButton;