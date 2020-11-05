import React from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'

const TutorialContainer = styled.div`
margin: 0% auto;

  width: 80%;
  height: 550px;
  display: grid;
  grid-template-rows: 20% 80%;
  grid-row-gap: 25px;
  color: white;
  opacity: 90%;
`

const TutorialHeader = styled.span`
font-family: 'Press Start 2P', cursive;
  font-size: 2.5rem;
  margin-top: 4%;
`

const TutorialHowToPlayContainer = styled.div`
width: 80%;
  height: 350px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 90% 10%;
  font-family: 'VT323', monospace;
  font-size: 1.5rem;
`
const TutorialPlayButton = styled.button`
border-radius: 10px;
  width: 100px;
  height: 30px;
`

const Tutorial = (props) => {

    return (
      <TutorialContainer >
        <TutorialHeader>Tutorial</TutorialHeader>
        <TutorialHowToPlayContainer>
          
          <p className='tutorial-paragraph'>Welcome {props.username}!</p>
          <Link to='/game'>
          <TutorialPlayButton>PLAY!</TutorialPlayButton>
          </Link>
         </TutorialHowToPlayContainer>
      </TutorialContainer>
    );
  
}

export default Tutorial;