import React, { Component } from 'react';
import './Album.css'
import example1 from '../../pictures/album-example-1.jpg'
import example2 from '../../pictures/album-example-2.jpg'
import example3 from '../../pictures/album-example-3.jpg'
import example4 from '../../pictures/album-example-4.jpg'
import Carousel from 'react-images';


const images = [{ source: example1 }, { source: example2}, {source: example3},{source:example4}];

class Album extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      profile_id: this.props.profileId
    }
  }
  
  render() {
    const renderUploadButton = ()=>{
      if(this.state.profile_id===sessionStorage.getItem('id')){
        return (<button className="btn btn-primary" id="upload-photo-btn"> Upload Photo</button>)
      } 
      else {return (<div></div>)}
    }

    return (
        <div className="album-box">
            <p className="album-header">HIKING ALBUM</p>
            <div className="gallery">
                <Carousel views={images} />
            </div>
            {renderUploadButton()}
        </div>
        
    )
  }
}
export default Album;

