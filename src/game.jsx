import React, { Component } from "react";
import Phaser from "phaser";
import tileSet from "./assets/RPGpack_sheet.png";
import tileJson from "./assets/test_map_1.json";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js"; // Plug-in for pop up

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
      plugins: { // Set up REX UI for pop-ups and dialog
        scene: [
          {
            key: "rexUI",
            plugin: UIPlugin,
            mapping: "rexUI",
          },
        ],
      },
    });
    this.player = null;
    this.cursors = null;
    this.camera = null;
    this.controls = null;
    this.score = null;
    this.scoreDisplay = null;
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
    this.load.scenePlugin( //Loads plugin 
      "rexuiplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      "rexUI",
      "rexUI"
    );
  }

  create() {
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32,
    });
    // Set default variables
    let scene = this;
    let overlapping = false;
    let dialog = undefined;
    let dialogOpen = false;
    // Set up Tile Map with Collision
    const tileset = map.addTilesetImage("RPGpack_sheet", "tiles");
    const floorLayer = map.createStaticLayer("Floor", tileset, 0, 0);
    const treeLayer = map.createStaticLayer("Trees", tileset, 0, 0);

    //Setting up Score and Score Display
    this.score = 0;
    this.scoreDisplay = this.add.text(0, 0, `Score: ${this.score}`, { fontSize: '32px' }).setScrollFactor(0);

    //Update Score
    this.updateScore = () => {
      this.score += 1;
      this.scoreDisplay.setText(`Score: ${this.score}`)
    }

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

    console.log(Phaser.Input.Keyboard.KeyCodes, "KEY CODES");
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      spaceBar: Phaser.Input.Keyboard.KeyCodes.SPACE,
      tab: Phaser.Input.Keyboard.KeyCodes.TAB,
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

    //below is where result of clicking button will be added to
    this.print = this.add.text(this.player.x, this.player.y, "CLICKED?");
    console.log(this, "this next to text")

    // adds a label that holds each option "button"
    let createButton = function (scene, text) {
      return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),
        text: scene.add.text(0, 0, text, {
          fontSize: "18px",
        }),
      });
    };

    // creates zone for the sprite to collide with
    this.zone = this.add.zone(spawnPoint.x, spawnPoint.y + 80).setSize(100, 100);
    this.physics.world.enable(this.zone);

    this.player.on("overlapstart", function () {
      this.body.debugBodyColor = 0xff3300;
      overlapping = true;
      console.log("overlap start");
      console.time("overlap");
    });
    this.player.on("overlapend", function () {
      this.body.debugBodyColor = 0x00ff33;
      overlapping = false;
      console.log("overlap end");
      console.timeEnd("overlap");
    });

    this.physics.add.overlap(this.player, this.zone);

    // interact function allows a dialog box to be created only if the sprite and zone are overlapping
    this.interact = () => {
      if (overlapping && dialog === undefined) {
        this.createDialog().setScrollFactor(0);
        dialogOpen = true;
      } else if (dialog !== undefined) {
        dialog.scaleDownDestory(100);
        dialog = undefined;
        console.log("popdown");
      }
    };

    // creates a dialog box, which pops up when clicked on
    this.createDialog = () => {
      console.log(`'create dialog at ${this.player.x} & ${this.player.y}`)
      let dialog = scene.rexUI.add.dialog({
        x: this.player.y,
        y: this.player.x,
        background: scene.rexUI.add.roundRectangle(250, 250, 250, 250, 20, 0xf57f17),
        title: scene.rexUI.add.label({

        })
      })
      return dialog;
    }

    // only lets the dialog box be destroyed if the pointer is over the dialog box
    this.removeDialog = () => {
      if (dialogOpen) {
        console.log('tab')
        this.dialog.scaleDownDestroy(100);
        dialog = undefined;
        dialogOpen = false;
      }
      return dialog;
    }
    // this.input.on(
    //   "pointerdown",
    //   function (pointer) {
    //     console.log("pointer");

    //   },
    //   this
    // );

    // this.createDialog = (scene, x, y) => {
    //   console.log("popup");
    //   let dialog = scene.rexUI.add
    //     .dialog({
    //       x: x,
    //       y: y,
    //       background: scene.rexUI.add.roundRectangle(
    //         0,
    //         0,
    //         100,
    //         100,
    //         20,
    //         0xf57f17
    //       ),
    //       title: scene.rexUI.add.label({
    //         background: scene.rexUI.add.roundRectangle(
    //           0,
    //           0,
    //           100,
    //           40,
    //           20,
    //           0xbc5100
    //         ),
    //         text: scene.add.text(0, 0, "Can you help me?", {
    //           fontSize: "20px",
    //         }),
    //       }),
    //       // space: {
    //       //   left: 15,
    //       //   right: 15,
    //       //   top: 10,
    //       //   bottom: 10,
    //       // },
    //       // calls createButton to make two labels within dialog box
    //       actions: [createButton(this, "OK"), createButton(this, "NOT OK")],
    //       actionsAlign: "left",
    //       space: {
    //         title: 20,
    //         action: 10,

    //         left: 15,
    //         right: 15,
    //         top: 10,
    //         bottom: 10,
    //       },
    //     })
    //     // when you click a "button" i.e. a label, it adds text to the page
    //     .on(
    //       "button.click",
    //       function (button, groupName, index, pointer, event) {
    //         console.log("ANYTHING");
    //         this.print.text += "true \n";
    //         console.log("ANYTHING");
    //         console.log(this, "this");
    //         console.log(button.text, "button text");
    //       },
    //       this
    //     )
    //     // below makes the "button" change in appearance when the cursor hovers over it
    //     .on("button.over", function (button, groupName, index, pointer, event) {
    //       button.getElement("background").setStrokeStyle(1, 0xffffff);
    //     })
    //     .on("button.out", function (button, groupName, index, pointer, event) {
    //       button.getElement("background").setStrokeStyle();
    //     })
    //     .layout()
    //     .pushIntoBounds()
    //     .popUp(500);
    //   console.log(dialog, "in create dialog");

    //   return dialog;
    // };
  }

  update() {
    //Change Animations
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

    // if the space bar is down, call the interact function, which pops up the dialog box
    if (this.cursors.spaceBar.isDown) {
      this.interact();
    }
    if (this.cursors.tab.isDown) {
      this.removeDialog();
    }

    // adds logic so phaser knows when the spirte touches the zone
    if (this.player.body.embedded) {
      this.player.body.touching.none = false;
    }
    let touching = !this.player.body.touching.none;
    let wasTouching = !this.player.body.wasTouching.none;

    if (touching && !wasTouching) {
      this.player.emit("overlapstart");
    } else if (!touching && wasTouching) {
      this.player.emit("overlapend");
    }
  }
}

export default Game;
