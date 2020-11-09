import React, { Component } from 'react';

class WinPage extends Component {
  state = {
    user: '',
    users: []
  }



  // postUser = (username) => {
  //   console.log('post user')
  //   fetch('https://helpers-game-backend.herokuapp.com/playerlist', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: username
  //     })
  //   })
  //   .then((res) => res.json())
  //   .then((players) => {
  //     console.log(players)
  //   })
  // }

  getUsers = () => {
    console.log('get user')
    fetch('https://helpers-game-backend.herokuapp.com/playerlist', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((players) => {
      console.log(players)
    })
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <h1>Well Done!</h1>
    )
  }
}

export default WinPage;