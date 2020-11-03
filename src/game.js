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
  this.player = null;
  // this.cursors = null;
  // this.camera = null;
  this.controls = null;
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
    this.load.spritesheet('dude', 'https://i.imgur.com/0x8P9a6.png', { frameWidth: 16, frameHeight: 24})


  }


  create () {
    this.player = this.physics.add.sprite(50, 225, 'dude')

this.cursors = this.input.keyboard.createCursorKeys();

 this.cursors = this.input.keyboard.addKeys(
{up:Phaser.Input.Keyboard.KeyCodes.W,
down:Phaser.Input.Keyboard.KeyCodes.S,
left:Phaser.Input.Keyboard.KeyCodes.A,
right:Phaser.Input.Keyboard.KeyCodes.D});

this.anims.create({
  key: 'down',
  frames: this.anims.generateFrameNumbers('dude', {start:0, end:3}),
  frameRate: 10,
  repeat: -1,

})
this.anims.create({
  key: 'right',
  frames: this.anims.generateFrameNumbers('dude', {start:4, end:7}),
  frameRate: 10,
  repeat: -1,

})
this.anims.create({
  key: 'left',
  frames: this.anims.generateFrameNumbers('dude', {start:8, end:11}),
  frameRate: 10,
  repeat: -1,

})
this.anims.create({
  key: 'up',
  frames: this.anims.generateFrameNumbers('dude', {start:12, end:15}),
  frameRate: 10,
  repeat: -1,

})

  }

  update () {
if (this.cursors.left.isDown) {
    this.player.setVelocityX(-160);
    this.player.anims.play('left', true);
  }
  else if (this.cursors.right.isDown) {
    this.player.setVelocityX(160);

    this.player.anims.play('right', true);
  } 
  else if(this.cursors.up.isDown) {
    this.player.setVelocityY(-160)
    this.player.anims.play('up', true);

  } else if (this.cursors.down.isDown) {
    this.player.setVelocityY(160)
    this.player.anims.play('down', true);
    
  }
  else {
    this.player.setVelocityX(0);
     this.player.setVelocityY(0);
    // this.player.anims.play('turn');
  }

  this.player.body.velocity.normalize().scale(90);
}
  }


export default Game;