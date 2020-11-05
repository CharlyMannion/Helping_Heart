import React, { Component } from 'react';
import {Link} from '@reach/router'
import helpIcon from '../assets/help-icon.png'


class Username extends Component {

  handleSubmit = (event) => {
    event.preventDefault()
   let username = event.target.value
    this.props.setUser(username)
    

  }

  render() {
    return (
      <div className='username-container'>
        
        
        <span className='home-title'>NC HELPER!</span>
        <span className='home-moto'>A GAME ABOUT KINDNESS</span>
        <i class="fas fa-medkit"></i>
        <div className='info-container'>
        <span>Enter username: </span>
        <form onChange={this.handleSubmit}>
        <input type='text' name='username'  ></input>
        </form>
        <Link to='/tutorial'>
        <input type='submit'></input>
        </Link>
        </div>
      </div>
    );
  }
}

export default Username;