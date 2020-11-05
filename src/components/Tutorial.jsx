import React from 'react';
import {Link} from '@reach/router'

const Tutorial = (props) => {

  
  
    return (
      <div className='tutorial-container'>
        <span className='tutorial-header'>Tutorial</span>
        <div className='tutorial-howToPlay-container'>
          <span className='tutorial-howToPlay'>How to play:</span>
          <p className='tutorial-paragraph'>Welcome {props.username}!</p>
          <Link to='/game'>
          <button className='tutorial-playButton'>PLAY!</button>
          </Link>
         </div>
      </div>
    );
  
}

export default Tutorial;