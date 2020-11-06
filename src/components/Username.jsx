import React, { Component } from 'react';
import {Link} from '@reach/router'


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
      <div>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <input type='text' name='username'  ></input>
        
        <Link to='/game'>
        <input type='submit'></input>
        </Link>
        </form>
      </div>
    );
  }
}

export default Username;