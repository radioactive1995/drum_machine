import './Button.css'
import React, { useState, useEffect } from 'react';
export default function Button({audioString, audioUrl, content, setContent}) {

    let element = null;

    useEffect(() => {
        element = document.querySelector(`#${audioString}`)
        element.volume = content.volume/100;
        console.log(element.volume)

        element.addEventListener('ended', endedHandler);

        return () => {
            element.removeEventListener('click', onClickHandler);
            element.removeEventListener('ended', endedHandler);
        }
    })

    const endedHandler = (event) => {
            let button = document.querySelector(`#button-${audioString}`);
            button.style = {
                backgroundColor: ''
            };
            setContent((prevContent) => {
                return {textPlaying: '', volume: prevContent.volume, toggleText: prevContent.toggleText }
              })
    }
    const onClickHandler = () => {
        if (content.toggleText !== 'Off') {
        setContent((prevContent) => {
            return {textPlaying: (<span><span className='big'>{audioString}</span> is playing</span>), volume: prevContent.volume, toggleText: prevContent.toggleText}
          })

        console.log(element)
        if (element.duration > 0 && !element.paused) {
            element.currentTime = 0;
        } else {
            element.play()
        }
    }
    }


    return (
        <div className="button"><audio src={audioUrl} id={audioString}></audio><button  className='animate' onClick={onClickHandler} id={`button-${audioString}`}>{audioString}</button></div>
    )
}