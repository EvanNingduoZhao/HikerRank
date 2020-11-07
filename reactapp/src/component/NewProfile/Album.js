import React, { Component } from 'react';
import './Album.css'
import example1 from '../../pictures/album-example-1.jpg'
import example2 from '../../pictures/album-example-2.jpg'
import example3 from '../../pictures/album-example-3.jpg'
import example4 from '../../pictures/album-example-4.jpg'
// import Gallery from 'react-photo-gallery';

// class Album extends Component {
//     render() {
//         const photos = [
//             {
//               src: example1,
//               width: 5,
//               height: 3
//             },
//             {
//               src: example2,
//               width: 1,
//               height: 1
//             }
//           ];
//         return (

//             <div>
//                 <Gallery photos={photos} />
//                 <div className="album-box">
//                 <p className="album-header">HIKING ALBUM</p>
//                 <p>USERNAME</p>
//                 <p>USERNAME</p>
//                 <p>USERNAME</p>
//                 <p>USERNAME</p>
//                 <p>USERNAME</p>
//             </div>
//             </div>
//         );
//     }
// }
import Carousel from 'react-images';

const images = [{ source: example1 }, { source: example2}, {source: example3},{source:example4}];

class Album extends Component {
  render() {
    return (
        <div className="album-box">
            <p className="album-header">HIKING ALBUM</p>
            <div className="gallery">
                <Carousel views={images} />
            </div>
            <button className="btn btn-primary" id="upload-photo-btn"> Upload Photo</button>
        </div>
        
    )
  }
}
export default Album;

