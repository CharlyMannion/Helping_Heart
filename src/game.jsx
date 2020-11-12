import React, { Component } from "react";
import Phaser from "phaser";
import tileSet from "./assets/RPGpack_sheet.png";
import tileJson from "./assets/test_map_1.json";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js"; // Plug-in for pop up

class NPCGameObject extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "npc");
  }
}

class NPCPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    pluginManager.registerGameObject("npc", this.createNPC);
  }

  createNPC(x, y) {
    return this.displayList.add(new NPCGameObject(this.scene, x, y));
  }
}

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
        global: [{ key: "NPCPlugin", plugin: NPCPlugin, start: true }],
        // Set up REX UI for pop-ups and dialog
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
    this.currentZone = null;
  }

  render() {
    return (
      <div className="game-container">
        <h1>Helping Heart</h1>
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
    this.load.spritesheet('npc', 'https://i.imgur.com/0x8P9a6.png', { frameWidth: 16, frameHeight: 24 })
    this.load.scenePlugin(
      //Loads plugin
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
    let overlapping = false;
    let dialog = undefined;
    // Set up Tile Map with Collision
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

    //Create NPCs
    let spriteDave = this.add.npc(spawnPoint.x + 50, spawnPoint.y + 50);
    this.zoneDave = this.add
      .zone(spawnPoint.x + 50, spawnPoint.y + 50)
      .setSize(75, 75);
    this.physics.world.enable(this.zoneDave);

    let spriteFrank = this.add.npc(spawnPoint.x + 50, spawnPoint.y + 150);
    this.zoneFrank = this.add
      .zone(spawnPoint.x + 50, spawnPoint.y + 150)
      .setSize(75, 75);
    this.physics.world.enable(this.zoneFrank);

    //below is where result of clicking button will be added to
    this.print = this.add.text(this.player.x, this.player.y, "CLICKED?");

    // adds a label that holds each option "button"
    let createButton = function (scene, text) {
      return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),
        text: scene.add.text(0, 0, text, {
          fontSize: "18px",
        }),
      });
    };

    this.player.on("overlapstart", function () {
      this.body.debugBodyColor = 0xff3300;
      overlapping = true;
      // console.log("overlap start");
      console.time("overlap");
      updateScore();
    });
    this.player.on("overlapend", function () {
      this.body.debugBodyColor = 0x00ff33;
      overlapping = false;
      // console.log("overlap end");
      console.timeEnd("overlap");
    });

    this.physics.add.overlap(this.player, this.zone);
    // Adds overlap functionality to the NPC zones
    this.physics.add.overlap(this.player, this.zoneFrank);
    this.physics.add.overlap(this.player, this.zoneDave);

    // Score Display and Declaring win state
    this.score = 0;
    this.scoreDisplay = this.add
      .text(0, 0, `score: ${this.score}`, { fontSize: "32px" })
      .setScrollFactor(0);

    const updateScore = () => {
      this.score += 1;
      this.scoreDisplay.setText(`score: ${this.score}`);
      if (this.score === 5) {
        this.finishGame();
      }
    };
    this.finishGame = () => {
      this.physics.pause();
      this.player.setTint(0xff0000);
    };

    // creates a dialog box with buttons inside it
    this.createDialog = (scene, x, y) => {
      let dialog = scene.rexUI.add
        .dialog({
          x: x,
          y: y,
          background: scene.rexUI.add.roundRectangle(
            0,
            0,
            100,
            100,
            20,
            0xf57f17
          ),
          title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(
              0,
              0,
              100,
              40,
              20,
              0xbc5100
            ),
            text: scene.add.text(0, 0, "Can you help me?", {
              fontSize: "20px",
            }),
          }),
          // calls createButton to make two labels within dialog box
          actions: [createButton(this, "OK"), createButton(this, "NOT OK")],
          actionsAlign: "left",
          space: {
            title: 20,
            action: 10,

            left: 15,
            right: 15,
            top: 10,
            bottom: 10,
          },
        })
        // when you click a "button" i.e. a label, it adds text to the page
        .on(
          "button.click",
          function (button, groupName, index, pointer, event) {
            this.print.text += "\n true \n";
            // when you click on a "button", the dialog box should disappear
            dialog.scaleDownDestroy(100);
          },
          this
        )
        // below makes the "button" change in appearance when the cursor hovers over it
        .on("button.over", function (button, groupName, index, pointer, event) {
          button.getElement("background").setStrokeStyle(1, 0xffffff);
        })
        .on("button.out", function (button, groupName, index, pointer, event) {
          button.getElement("background").setStrokeStyle();
        })
        .layout()
        .pushIntoBounds()
        .popUp(500);
      return dialog;
    };

    // interact function allows a dialog box to be created only if the sprite and zone are overlapping
    this.interact = () => {
      if (overlapping && dialog === undefined) {
        this.createDialog(this, 2243.10344827586, 4050).setScrollFactor(0);
      }
    };
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
    }
    this.player.body.velocity.normalize().scale(200);

    let getZone = () => {
      if (this.zoneDave.body && !this.zoneDave.body.touching.none) {
        return this.zoneDave;
      } else if (this.zoneFrank.body && !this.zoneFrank.body.touching.none) {
        return this.zoneFrank;
      }
    };

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
      this.currentZone = getZone();
    } else if (!touching && wasTouching) {
      this.player.emit("overlapend");
      this.currentZone.destroy();
    }
  }
}

export default Game;
