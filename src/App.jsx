import './App.css';
import Game from './game.jsx';
import { Router } from '@reach/router'
import Username from './components/Username';
import React, { Component } from 'react';
import WinPage from './pages/WinPage';
import Tutorial from './components/Tutorial';
import ErrorDisplay from './components/ErrorDisplay';

class App extends Component {

  state = {
    user: ''
  }

  setUser = (username) => {
    this.setState({ user: username })
  }


  render() {
    return (
    <div className="App">
      <Router>
        
      <Username path='/' setUser={this.setUser} />
      <Tutorial path='/tutorial' username={this.state.user}/>
      <Game path='/game' name={this.state.user}/>
      <WinPage path='/end' name={this.state.user}/>
      <ErrorDisplay default status={404} message='this page does not exist' />
      </Router>
    </div>
    )
  }
}

export default App;
