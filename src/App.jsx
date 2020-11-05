import './App.css';
import Game from './game';
import {Router} from '@reach/router'
import Username from './components/Username';
import React,{Component} from 'react'
import Tutorial from './components/Tutorial';

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
      <Tutorial path='/tutorial' username={this.state.user}/>
     
      <Game path='/game' name={this.state.user}/>
      </Router>
    </div>
    )
}
}

export default App;
