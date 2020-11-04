import React, { Component } from "react";
import Phaser from "phaser";
import tileSet from "./assets/RPGpack_sheet.png";
import tileJson from "./assets/test_map_1.json";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

class Game extends Component {
  componentDidMount() {
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 500,
      height: 500,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: true,
        },
      },
      parent: "game-container",
      scene: {
        preload: this.preload,
        create: this.create,
        update: this.update,
      },
      plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
    });
    this.player = null;
    // this.cursors = null;
    this.camera = null;
    this.controls = null;
  }

  render() {
    return (
      <div className="game-container">
        <h1>NC Helper!</h1>
        <h2>{this.props.name}</h2>
      </div>
    );
  }

  preload() {
    this.load.image("tiles", tileSet);
    this.load.tilemapTiledJSON("map", tileJson);
    this.load.spritesheet("dude", "https://i.imgur.com/0x8P9a6.png", {
      frameWidth: 16,
      frameHeight: 24,
    });
  }

  create() {
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32,
    });

    const tileset = map.addTilesetImage("RPGpack_sheet", "tiles");
    const floorLayer = map.createStaticLayer("Floor", tileset, 0, 0);
    const treeLayer = map.createStaticLayer("Trees", tileset, 0, 0);

    //adding the sprite
    const spawnPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

    //camera to follow sprite
    const camera = this.cameras.main;
    camera.startFollow(this.player);

    //adding collision
    floorLayer.setCollisionByProperty({ collides: true });
    treeLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, floorLayer);
    this.physics.add.collider(this.player, treeLayer);

    //creating cursors to move
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    //animations
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("dude", { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("down", true);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      // this.player.anims.play('turn');
    }

    this.player.body.velocity.normalize().scale(200);
  }
}

export default Game;
