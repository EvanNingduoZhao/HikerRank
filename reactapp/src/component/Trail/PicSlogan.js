import React from 'react'
import trailPagePic from '../../pictures/TrailPagePic.png';


function PicSlogan(props) {
    console.log("pic_slogan is invoked")
    return (
        <div className='pic-slogan-container'>
            <img className='bg-image' src={trailPagePic} width='100%'/>
            <h1 className='slogan'>{props.name}</h1>
            <h3 className='sub-slogan'>{props.summary}</h3>
        </div>
    )
}

export default PicSlogan

