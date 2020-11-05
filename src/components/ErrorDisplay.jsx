import React, { Component } from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'


const ErrorContainer = styled.div`
display: flex;
flex-direction: column;
margin-top: 20%;
line-height: 40px;
font-size: 1.5rem;
`

const ErrorSpan = styled.span`
font-family: 'Press Start 2P', cursive;
  color: white;
  text-decoration: none;
`

class ErrorDisplay extends Component {
  render() {
    return (
      <ErrorContainer>
        <ErrorSpan>Oops! It looks like this page does not exist!</ErrorSpan>
        <Link to='/'>
          <ErrorSpan>Please click here to return home safely!</ErrorSpan>
        </Link>
      </ErrorContainer>
    );
  }
}

export default ErrorDisplay;