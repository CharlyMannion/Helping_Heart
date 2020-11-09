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

  state = {
    user: ''
  }

  handleChange = (event) => {
    event.preventDefault()
   let username = event.target.value
   this.setState({user: username})
    this.props.setUser(username)
    }

  postUser = (username) => {
    console.log('post user')
    fetch('https://helpers-game-backend.herokuapp.com/playerlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username
      })
    })
    .then((res) => res.json())
    .then((players) => {
      console.log(players)
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log('handle submit')
    this.postUser(this.state.user)
  }

  render() {
    return (
      <div className='username-container'>
        <HomeTitle>NC HELPER!</HomeTitle>
        <HomeTitle>A GAME ABOUT KINDNESS</HomeTitle>
        <i class="fas fa-medkit"></i>
        <InfoDiv>
        <span>Enter username: </span>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <input type='text' name='username'  ></input>
        <Link to='/tutorial'>
        <input type='submit'></input>
        </Link>
         </form>
        </InfoDiv>
      </div>
    );
  }
}

export default Username;