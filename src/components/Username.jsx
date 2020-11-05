import React, { Component } from 'react';
import {Link} from '@reach/router'
import helpIcon from '../assets/help-icon.png'
import styled from 'styled-components'

const HomeTitle = styled.span`
font-family: 'Press Start 2P', cursive;
  font-size: 2.5rem;
  color: white;
  display: flex;
  flex-direction: column;
`

const InfoDiv = styled.div`
 margin-top: 30%;
  font-family: 'Press Start 2P', cursive;
  color: white;
`

class Username extends Component {

  handleSubmit = (event) => {
    event.preventDefault()
   let username = event.target.value
    this.props.setUser(username)
    

  }

  render() {
    return (
      <div className='username-container'>
        
        
        <HomeTitle>NC HELPER!</HomeTitle>
        <HomeTitle>A GAME ABOUT KINDNESS</HomeTitle>
        <i class="fas fa-medkit"></i>
        <InfoDiv>
        <span>Enter username: </span>
        <form onChange={this.handleSubmit}>
        <input type='text' name='username'  ></input>
        </form>
        <Link to='/tutorial'>
        <input type='submit'></input>
        </Link>
        </InfoDiv>
      </div>
    );
  }
}

export default Username;