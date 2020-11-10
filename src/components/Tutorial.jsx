import React from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'
import TutorialContainer from '../styledComponents/TutorialContainer';
import TutorialHeader from '../styledComponents/TutorialHeader';
import TutorialHowToPlayContainer from '../styledComponents/TutorialHowToPlayContainer'

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