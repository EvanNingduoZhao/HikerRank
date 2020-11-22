import React, { Component } from 'react'
import MyModal from './Event-modal';
import './JoinEventButton.css'
import ApplyIcon from "../../pictures/apply-icon.png";

const MODAL_A = 'modal_a';

class JoinEventButton extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            currentModal: null,
            modal_stay_open: null,
            userId : sessionStorage.getItem('id'),
            event_id:this.props.event_id,
            participants:[]
        }
        // console.log(this.state)
        // console.log(`this event id is: ${this.state.event_id}`)
    }

    
    componentDidMount(){
        if(sessionStorage.getItem('event_stay_open')==='true'){
          this.setState({
            currentModal: MODAL_A,
            modal_stay_open: true
          },()=>console.log(this.state));
          sessionStorage.setItem('event_stay_open','false')
        } else {
          this.setState({
            currentModal: null,
            modal_stay_open: false
          })
        }
      }


      toggleModal = key => event => {
        console.log(this.state)
        // alert(`${this.props.ini_picture}`)
        event.preventDefault();
        if (this.state.currentModal) {
          this.handleModalCloseRequest();
          return;
        }
    
        this.setState({
          ...this.state,
          currentModal: key,
        },()=>{console.log(this.state)});
        
      }
    
      handleModalCloseRequest = () => {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        this.setState({
          ...this.state,
          currentModal: null
        });
        // sessionStorage.removeItem('stay_open')
      }
    
      handleInputChange = e => {
        let text = e.target.value;
        if (text == '') {
        }
        this.setState({ ...this.state});
        console.log(this.state)
      }
    
      handleOnAfterOpenModal = () => {
        // when ready, we can access the available refs.
        this.heading && (this.heading.style.color = '#F00');
      }

    
    render() {
        const { currentModal } = this.state;
        return (
            <div>
                <button type="button" className="request-join-button" onClick={this.toggleModal(MODAL_A)}>
                    <h3>Request and Join</h3>
                </button>
                <MyModal
                    isOpen={currentModal == MODAL_A || this.modal_stay_open}
                    onAfterOpen={this.handleOnAfterOpenModal}
                    onRequestClose={this.handleModalCloseRequest}
                    askToClose={this.toggleModal(MODAL_A)}
                    onChangeInput={this.handleInputChange} 
                    userId={this.props.userId}
                    eventId={this.props.event_id}/>
            </div>
        )
    }
}

export default JoinEventButton
