import React, { Component } from 'react';
import Phaser from 'phaser'
import tileSet from './assets/RPGpack_sheet.png'
import tileJson from './assets/test_map_1.json'
//  Here is a custom game object
// let NPC = function (game, x, y) {
//   Phaser.Sprite.call(this, game, x, y, 'npc');
// };

// // NPC = Object.create(Phaser.Sprite);
// NPC.constructor = NPC;

class NPCGameObject extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene, x, y, 'npc')
  }
}

class NPCPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    pluginManager.registerGameObject('npc', this.createNPC);
  }

  createNPC(x, y) {
    return this.displayList.add(new NPCGameObject(this.scene, x, y))
  }
}

class Game extends Component {


  componentDidMount() {
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 500,
      height: 500,
      plugins: {
        global: [
          { key: 'NPCPlugin', plugin: NPCPlugin, start: true }
        ]
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true
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
    this.camera = null;
    this.controls = null;
    this.score = null;
    this.scoreDisplay = null;
  }


  render() {
    return (
      <div className='game-container'>
        <h1>NC Helper!</h1>
        <h2>{this.props.name}</h2>
      </div>
    );
  }

  preload() {
    this.load.image('tiles', tileSet);
    this.load.tilemapTiledJSON('map', tileJson);
    this.load.spritesheet('dude', 'https://i.imgur.com/0x8P9a6.png', { frameWidth: 16, frameHeight: 24 })
    this.load.spritesheet('npc', 'https://i.imgur.com/0x8P9a6.png', { frameWidth: 16, frameHeight: 24 })
  }


  create() {
    const map = this.make.tilemap({
      key: 'map', tileWidth: 32, tileHeight: 32
    });

    const tileset = map.addTilesetImage('RPGpack_sheet', 'tiles');
    const floorLayer = map.createStaticLayer('Floor', tileset, 0, 0);
    const treeLayer = map.createStaticLayer('Trees', tileset, 0, 0);

    //adding the sprite
    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point")
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'dude')

    //camera to follow sprite
    const camera = this.cameras.main;
    camera.startFollow(this.player)

    //adding collision
    floorLayer.setCollisionByProperty({ collides: true });
    treeLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, floorLayer)
    this.physics.add.collider(this.player, treeLayer)


    //creating cursors to move
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cursors = this.input.keyboard.addKeys(
      {
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
      });
    //animations
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,

    })
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,

    })
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,

    })
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1
    })

    //Create NPCs


    // const npcs = this.physics.add.group({
    //   key: 'npc',
    //   repeat: 4,
    //   setXY: { x: spawnPoint.x + 20, y: spawnPoint.y + 20, stepX: 25 }
    // })

    // npcs.children.iterate(function (child) {
    // })

    // const npcCollide = (player, npc) => {
    //   npc.disableBody(true, true)
    //   updateScore();
    // }

    // this.physics.add.overlap(this.player, npcs, npcCollide, null, this);



    // Score Display and Declaring win state
    this.score = 0;
    this.scoreDisplay = this.add.text(0, 0, `score: ${this.score}`, { fontSize: '32px' }).setScrollFactor(0);

    const updateScore = () => {
      this.score += 1;
      this.scoreDisplay.setText(`score: ${this.score}`);
      if (this.score === 5) {
        this.finishGame();
      }
    }
    this.finishGame = () => {
      this.physics.pause();
      this.player.setTint(0xff0000);
    }

    // Zones for NPC interaction
    // let overlapping = false;
    // let isActive = true;
    // this.zone = this.add.zone(spawnPoint.x, spawnPoint.y + 100).setSize(75, 75);
    // this.physics.world.enable(this.zone);

    // this.player.on('overlapstart', function () {
    //   this.body.debugBodyColor = 0xff3300;
    //   overlapping = true;
    //   if (isActive) {
    //     updateScore();
    //     isActive = false;
    //   }
    //   console.log("overlap start");
    //   console.time("overlap");
    // })
    // this.player.on('overlapend', function () {
    //   this.body.debugBodyColor = 0x00ff33;
    //   overlapping = false;
    //   console.log("overlap end");
    //   console.timeEnd("overlap");
    // })

    // this.physics.add.overlap(this.player, this.zone);

  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    }
    else if (this.cursors.up.isDown) {
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

    this.player.body.velocity.normalize().scale(200);

    // Update Logic for zones and overlapping
    // if (this.player.body.embedded) {
    //   this.player.body.touching.none = false;
    // }
    // let touching = !this.player.body.touching.none;
    // let wasTouching = !this.player.body.wasTouching.none;
    // if (touching && !wasTouching) {
    //   this.player.emit("overlapstart");
    // } else if (!touching && wasTouching) {
    //   this.player.emit("overlapend");
    // }
  }
}


export default Game;