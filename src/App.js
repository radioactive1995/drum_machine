import logo from './logo.svg';
import './App.css';
import Button from './Button';
import React, { useState, useEffect } from 'react';

function App() {

  const [cssStyle, setCssStyle] = useState({
    background: 'linear-gradient(to right,  rgba(24, 147, 218, 0.6) 50%, white 50%, white 100%)'
  })
  const [content, setContent] = useState({
    volume: 50,
    textPlaying: '',
    toggleText: 'On'
  })

  const buttons = [
    {
      audioString: 'Q',
      audioUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      audioString: 'W',
      audioUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      audioString: 'E',
      audioUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      audioString: 'A',
      audioUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      audioString: 'S',
      audioUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      audioString: 'D',
      audioUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      audioString: 'Z',
      audioUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      audioString: 'X',
      audioUrl: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      audioString: 'C',
      audioUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ]


  useEffect(() => {
    let element = document.querySelector('.slider');
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      element.removeEventListener('change', handleSlider)
    }
})

const handleKeyPress = (event) => {
  if (content.toggleText !== 'Off') {
  let element = document.querySelector(`#button-${event.key.toUpperCase()}`)
  if (element !== null) {
    element.style.backgroundColor = 'rgba(24, 147, 218, 0.089)';
    element.click()
    setContent((prevContent) => {
      return {textPlaying: (<span><span className='big'>{event.key.toUpperCase()}</span> is playing</span>), volume: prevContent.volume, toggleText: prevContent.toggleText}
    })
  }
}

}

const handleSlider = (event) => {
  const target = event.target;
  const value = Math.floor((target.value-target.min)/(target.max-target.min)*100)

  setCssStyle(() => {
    return { background: value !== 100 ? 'linear-gradient(to right,  rgba(24, 147, 218, 0.6) ' + value+'%, white ' + value +'%, white 100%)'
                                       : 'rgba(24, 147, 218, 0.6)'}
  })
  setContent((prevContent) => {
    return {textPlaying: prevContent.textPlaying, volume: value, toggleText: prevContent.toggleText}
  })
}

const handleToggle = (event) => {
  let element = document.querySelector('.toggle-mute');
  element.classList.toggle('toggle-switch')

  if([...element.classList].includes('toggle-switch')) {
    setContent((prevContent) => {
      console.log(prevContent.volume)
      return {textPlaying: '', volume: prevContent.volume, toggleText: 'Off'}
    })
  }

  else {
    setContent((prevContent) => {
      return {textPlaying: '', volume: prevContent.volume, toggleText: 'On'}
    })
  }
}

  return (
    <div className="App" id="drum-machine">
      {buttons.map(button => <Button  audioString={button.audioString} audioUrl={button.audioUrl} content={content} setContent={setContent} />)}
      <div className="view-port">
        <input className='slider' type='range' min='0' max='100' onChange={handleSlider} style={cssStyle} />
        <div className='content' id='display'><p className='volume'>Volume: {content.volume}</p><p className='textArea'>{content.textPlaying}</p>
        <p className='soundText'>Sound {content.toggleText}</p>
        </div>
        <input type='checkbox' className='toggle-mute' onClick={handleToggle} 
        value/>
      </div>
    </div>
  );
}

export default App;
