import './App.css';
import Game from './game.jsx';
import {Router} from '@reach/router'
import Username from './components/Username';
import React,{Component} from 'react'

class App extends Component {

state = {
  user: ''
}

setUser = (username) => {
     this.setState({user: username})
  }

  render() { 
    return (
    <div className="App">
      <Router>
      <Username path='/' setUser={this.setUser} />
      <Game path='/game' name={this.state.user}/>
      </Router>
    </div>
    )
}
}

export default App;
