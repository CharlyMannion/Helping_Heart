import React, { Component } from 'react';
import Phaser from 'phaser'

class Game extends Component {

  componentDidMount() {
  this.game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 300,
    height: 400,
    physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    },
  },
    parent: 'game-container',
    scene: {
      preload: this.preload,
      create: this.create,
      update: this.update
    }
  })
  // this.player = null;
  // this.cursors = null;
  // this.camera = null;
  // this.controls = null;
}


render() {
    return (
      <div className='game-container'>
        <h1>hi</h1>
        <h2>{this.props.name}</h2>
      </div>
    );
  }

  preload () {

  }


  create () {

  }

  update () {

  }
}

export default Game;