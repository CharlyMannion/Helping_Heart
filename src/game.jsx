import React, { Component } from "react";
import Phaser from "phaser";
import tileSetRPG from "./assets/RPGpack_sheet.png";
import tileSetGraveYard from "./assets/TilesetGraveyard.png";
import tileSetForest from "./assets/top-down-forest-tileset.png";
import map from "./assets/Game map.json";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js"; // Plug-in for pop up
import scenarioTree from "./Game_Components/scenario_tree";
import { navigate } from "@reach/router";
import menuSelect from "./assets/sounds/Menu Select.mp3";
import menuSelect2 from "./assets/sounds/Menu Select 2.mp3";
import denied from "./assets/sounds/Denied.mp3";
import styled from "styled-components";

const StyledHeaderGame = styled.h1`
  width: 80%;
  height: 30px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 90% 10%;
  font-family: "VT323", monospace;
  font-size: 3rem;
  color: white;
`;

const HomeTitleGame = styled.span`
  font-family: "Press Start 2P", cursive;
  font-size: 2.5rem;
  color: white;
  display: flex;
  flex-direction: column;
`;

const StyledParagraphGame = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  margin-top: 50px;
  display: grid;
  grid-template-rows: 90% 10%;
  font-family: "VT323", monospace;
  font-size: 1.5rem;
  color: white;
  text-align: center;
`;

class NPCGameObject extends Phaser.GameObjects.Image {
  constructor(scene, x, y, sprite, frame) {
    super(scene, x, y, sprite, frame);
  }
}

class NPCPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    pluginManager.registerGameObject("npc", this.createNPC);
  }

  createNPC(x, y, sprite, frame) {
    return this.displayList.add(
      new NPCGameObject(this.scene, x, y, sprite, frame)
    );
  }
}

class Game extends Component {
  componentDidMount() {
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 700,
      height: 500,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
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
      audio: {
        noAudio: false,
      },
    });
    this.player = null;
    this.cursors = null;
    this.camera = null;
    this.controls = null;
    this.score = null;
    this.scoreDisplay = null;
    this.currentZone = null;
    this.isDialogActive = false;
  }

  render() {
    return (
      <StyledParagraphGame className="game-container">
        <HomeTitleGame>
          Helping Heart
          <br></br>
          <br></br>
          {this.props.name}
        </HomeTitleGame>
        <br></br>
      </StyledParagraphGame>
    );
  }

  preload() {
    // Sound Effects Preload
    this.load.audio("menuClick", menuSelect, { instances: 1 });
    this.load.audio("menuClick2", menuSelect2, { instances: 1 });
    this.load.audio("fail", denied, { instances: 1 });

    this.load.image("tilesetRPG", tileSetRPG);
    this.load.image("tilesetGraveyard", tileSetGraveYard);
    this.load.image("tilesetForest", tileSetForest);
    this.load.tilemapTiledJSON("map", map);

    //Heart
    this.load.image("heart0", "https://i.imgur.com/G45CBD5.png");
    this.load.image("heart1", "https://i.imgur.com/pjhXAxP.png");
    this.load.image("heart2", "https://i.imgur.com/ZQ5sdvb.png");
    this.load.image("heart3", "https://i.imgur.com/Zm9lnjS.png");
    this.load.image("heart4", "https://i.imgur.com/RxgFjwT.png");
    this.load.image("heart5", "https://i.imgur.com/9j35Q2K.png");
    this.load.image("heart6", "https://i.imgur.com/rGptaej.png");
    this.load.spritesheet("heartsheet", "https://i.imgur.com/FmX2Cjz.png", {
      frameWidth: 35,
      frameHeight: 35,
    });
    //Player
    this.load.spritesheet("dude", "https://i.imgur.com/0x8P9a6.png", {
      frameWidth: 16,
      frameHeight: 24,
    });
    //NPCs
    this.load.spritesheet("npcSheet1", "https://i.imgur.com/ODWXDGl.png", {
      frameWidth: 80,
      frameHeight: 120,
    });
    this.load.spritesheet("npcSheet2", "https://i.imgur.com/YPQHY2E.png", {
      frameWidth: 80,
      frameHeight: 120,
    });
    this.load.spritesheet("npcSheet3", "https://i.imgur.com/CjrurIL.png", {
      frameWidth: 80,
      frameHeight: 120,
    });
    this.load.spritesheet("npcSheet4", "https://i.imgur.com/FoLqrhK.png", {
      frameWidth: 80,
      frameHeight: 120,
    });
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
    // creating the layers of the map
    const addTilesetRPG = map.addTilesetImage("RPG map", "tilesetRPG");
    const addGraveyard = map.addTilesetImage("graveyard", "tilesetGraveyard");
    const addOldForest = map.addTilesetImage(
      "top-down-forest-tileset",
      "tilesetForest"
    );
    const outskirts = map.createStaticLayer(
      "Floor outskirts",
      addTilesetRPG,
      0,
      0
    );
    const outskirtTrees = map.createStaticLayer(
      "Floor outskirts trees",
      addTilesetRPG,
      0,
      0
    );
    const floorLayer = map.createStaticLayer("Floor", addTilesetRPG, 0, 0);
    const floorLayer2 = map.createStaticLayer(
      "Floor Old forest",
      addOldForest,
      0,
      0
    );
    const floorLayer3 = map.createStaticLayer(
      "Floor Graveyard",
      addGraveyard,
      0,
      0
    );
    const rpgCollision = map.createStaticLayer(
      "Collision",
      addTilesetRPG,
      0,
      0
    );
    const oldForestCollision = map.createStaticLayer(
      "Collision Old forest",
      addOldForest,
      0,
      0
    );
    const graveyardCollision = map.createStaticLayer(
      "Collision Graveyard",
      addGraveyard,
      0,
      0
    );
    const graveyardCollisionForest = map.createStaticLayer(
      "Collision Graveyard forest-set",
      addOldForest,
      0,
      0
    );
    const houseBricks = map.createStaticLayer(
      "House bricks",
      addTilesetRPG,
      0,
      0
    );
    const forestHouse = map.createStaticLayer(
      "Forest house",
      addTilesetRPG,
      0,
      0
    );
    const forestHouseFeatures = map.createStaticLayer(
      "Forest house features",
      addTilesetRPG,
      0,
      0
    );
    const decoration = map.createStaticLayer("Decoration", addGraveyard, 0, 0);

    //seting the collision property of certain created layer to true
    rpgCollision.setCollisionByProperty({ collides: true });
    oldForestCollision.setCollisionByProperty({ collides: true });
    graveyardCollision.setCollisionByProperty({ collides: true });
    graveyardCollisionForest.setCollisionByProperty({ collides: true });
    forestHouseFeatures.setCollisionByProperty({ collides: true });
    decoration.setCollisionByProperty({ collides: true });
    houseBricks.setCollisionByProperty({ collides: true });
    outskirtTrees.setCollisionByProperty({ collides: true });

    // Create Sound Effects
    // let menuClickSFX = this.sound.add('menuClick');

    //adding sprite locations
    const spriteLocation = (objectName) => {
      return map.findObject("Objects", (obj) => obj.name === objectName);
    };

    const spawnPoint = spriteLocation("Spawn Point");
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

    const villageSpawn = spriteLocation("Villiage NPC");

    const parkSpawn = spriteLocation("Park NPC");

    const woodSpawn = spriteLocation("Wood NPC");

    const supermarketSpawn = spriteLocation("Supermarket NPC");

    const oldForestSpawn = spriteLocation("Old forest NPC");

    const graveyardSpawn = spriteLocation("Graveyard NPC");

    //camera to follow sprite
    const camera = this.cameras.main;
    camera.startFollow(this.player);

    //adding collision to the player sprite in relation to each layer
    this.physics.add.collider(this.player, rpgCollision);
    this.physics.add.collider(this.player, oldForestCollision);
    this.physics.add.collider(this.player, graveyardCollision);
    this.physics.add.collider(this.player, graveyardCollisionForest);
    this.physics.add.collider(this.player, forestHouseFeatures);
    this.physics.add.collider(this.player, decoration);
    this.physics.add.collider(this.player, houseBricks);
    this.physics.add.collider(this.player, outskirtTrees);

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

    let spriteVillageNPC = this.add.npc(
      villageSpawn.x,
      villageSpawn.y,
      "npcSheet1",
      1
    );
    spriteVillageNPC.scale = 0.35;
    this.zoneVillageNPC = this.add
      .zone(villageSpawn.x, villageSpawn.y)
      .setSize(75, 75);
    this.physics.world.enable(this.zoneVillageNPC);

    let spriteWoodNPC = this.add.npc(woodSpawn.x, woodSpawn.y, "npcSheet2", 49);
    spriteWoodNPC.scale = 0.35;
    this.zoneWoodNPC = this.add.zone(woodSpawn.x, woodSpawn.y).setSize(75, 75);
    this.physics.world.enable(this.zoneWoodNPC);

    let spriteParkNPC = this.add.npc(parkSpawn.x, parkSpawn.y, "npcSheet3", 1);
    spriteParkNPC.scale = 0.35;
    this.zoneParkNPC = this.add.zone(parkSpawn.x, parkSpawn.y).setSize(75, 75);
    this.physics.world.enable(this.zoneParkNPC);

    let spriteSupermarketNPC = this.add.npc(
      supermarketSpawn.x,
      supermarketSpawn.y,
      "npcSheet4",
      4
    );
    spriteSupermarketNPC.scale = 0.35;
    this.zoneSupermarketNPC = this.add
      .zone(supermarketSpawn.x, supermarketSpawn.y)
      .setSize(75, 75);
    this.physics.world.enable(this.zoneSupermarketNPC);

    let spriteOldForestNPC = this.add.npc(
      oldForestSpawn.x,
      oldForestSpawn.y,
      "npcSheet2",
      4
    );
    spriteOldForestNPC.scale = 0.35;
    this.zoneOldForestNPC = this.add
      .zone(oldForestSpawn.x, oldForestSpawn.y)
      .setSize(75, 75);
    this.physics.world.enable(this.zoneOldForestNPC);

    let spriteGraveyardNPC = this.add.npc(
      graveyardSpawn.x,
      graveyardSpawn.y,
      "npcSheet4",
      55
    );
    spriteGraveyardNPC.scale = 0.35;
    this.zoneGraveyardNPC = this.add
      .zone(graveyardSpawn.x, graveyardSpawn.y)
      .setSize(75, 75);
    this.physics.world.enable(this.zoneGraveyardNPC);

    // adds a label that holds each option "button"
    let createButton = function (scene, text, name) {
      if (text !== "") {
        return scene.rexUI.add.label({
          background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x00468b),
          text: scene.add
            .text(0, 0, text, {
              fontSize: "12px",
              align: "center",
              padding: { left: 10, right: 10, top: 10, bottom: 10 },
            })
            .setWordWrapWidth(125),
          name: name,
        });
      } else {
        return scene.rexUI.add.label({
          background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, 0xf57f17),
          text: scene.add.text(0, 0, text, {
            fontSize: "12px",
          }),
          name: name,
        });
      }
    };

    this.player.on("overlapstart", function () {
      this.body.debugBodyColor = 0xff3300;
      overlapping = true;
      // console.log("overlap start");
      console.time("overlap");
    });
    this.player.on("overlapend", function () {
      this.body.debugBodyColor = 0x00ff33;
      overlapping = false;
      // console.log("overlap end");
      console.timeEnd("overlap");
    });

    this.physics.add.overlap(this.player, this.zone);
    // Adds overlap functionality to the NPC zones
    this.physics.add.overlap(this.player, this.zoneWoodNPC);
    this.physics.add.overlap(this.player, this.zoneVillageNPC);
    this.physics.add.overlap(this.player, this.zoneParkNPC);
    this.physics.add.overlap(this.player, this.zoneSupermarketNPC);
    this.physics.add.overlap(this.player, this.zoneOldForestNPC);
    this.physics.add.overlap(this.player, this.zoneGraveyardNPC);

    // Score and Winning
    // Set up the score variable and display that to the screen
    this.score = 0;
    this.scoreDisplay = this.add
      .sprite(0, 0, `heart${this.score}`)
      .setScrollFactor(0);
    this.scoreDisplay.x = 50;
    this.scoreDisplay.y = 50;
    // Run this Function to increase score by one then check if the score has reached 5 or not
    const updateScore = () => {
      this.score += 1;
      this.scoreDisplay = this.add
        .sprite(0, 0, `heart${this.score}`)
        .setScrollFactor(0);
      this.scoreDisplay.x = 50;
      this.scoreDisplay.y = 50;
      if (this.score === 6) {
        this.finishGame();
      }
    };
    // Run this fucntion to end the game
    this.finishGame = () => {
      this.physics.pause();
      this.player.setTint(0xff0000);
      navigate("/end");
      this.sys.game.destroy(true);
    };

    // creates a dialog box with buttons inside it
    this.createDialog = (
      scene,
      x,
      y,
      scenarioText,
      zone,
      buttonText1,
      buttonText2,
      nextScenario1,
      nextScenario2,
      end
    ) => {
      this.isDialogActive = true;
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
            text: scene.add
              .text(0, 0, scenarioText, {
                fontSize: "14px",
                align: "center",
                padding: { left: 15, right: 10, top: 10, bottom: 10 },
              })
              .setWordWrapWidth(400),
          }),
          // calls createButton to make two labels within dialog box
          actions: [
            createButton(this, buttonText1, "b1"),
            createButton(this, buttonText2, "b2"),
          ],
          actionsAlign: "left",
          space: {
            title: 30,
            action: 50,
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
            // when you click on a "button", the dialog box should disappear
            if (button.name === "b1") {
              if (nextScenario1 === null && !end) {
                scene.sound.play("fail");
              }
              if (nextScenario1 !== null) {
                scene.sound.play("menuClick");
                scenarioTree[nextScenario1].call(this, zone);
              }
            }
            if (button.name === "b2") {
              if (nextScenario2 !== null) {
                scene.sound.play("menuClick");
                scenarioTree[nextScenario2].call(this, zone);
              }
              if (nextScenario2 === null && !end) {
                scene.sound.play("fail");
              }
            }
            dialog.scaleDownDestroy(100);
            this.isDialogActive = false;
            // If you manage to help someone
            if (end) {
              updateScore();
              scene.sound.play("menuClick2");
              zone.destroy();
            }
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
    this.interact = (zone) => {
      if (overlapping && dialog === undefined) {
        if (zone === this.zoneVillageNPC) {
          scenarioTree.startVillageNPC.call(this, zone);
        } else if (zone === this.zoneWoodNPC) {
          scenarioTree.startWoodNPC.call(this, zone);
        } else if (zone === this.zoneParkNPC) {
          scenarioTree.startParkNPC.call(this, zone);
        } else if (zone === this.zoneSupermarketNPC) {
          scenarioTree.startSupermarketNPC.call(this, zone);
        } else if (zone === this.zoneOldForestNPC) {
          scenarioTree.startOldForestNPC.call(this, zone);
        } else if (zone === this.zoneGraveyardNPC) {
          scenarioTree.startGraveyardNPC.call(this, zone);
        }
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
      if (this.zoneVillageNPC.body && !this.zoneVillageNPC.body.touching.none) {
        return this.zoneVillageNPC;
      } else if (
        this.zoneWoodNPC.body &&
        !this.zoneWoodNPC.body.touching.none
      ) {
        return this.zoneWoodNPC;
      } else if (
        this.zoneSupermarketNPC.body &&
        !this.zoneSupermarketNPC.body.touching.none
      ) {
        return this.zoneSupermarketNPC;
      } else if (
        this.zoneParkNPC.body &&
        !this.zoneParkNPC.body.touching.none
      ) {
        return this.zoneParkNPC;
      } else if (
        this.zoneGraveyardNPC.body &&
        !this.zoneGraveyardNPC.body.touching.none
      ) {
        return this.zoneGraveyardNPC;
      } else if (
        this.zoneOldForestNPC.body &&
        !this.zoneOldForestNPC.body.touching.none
      ) {
        return this.zoneOldForestNPC;
      }
    };

    // if the space bar is down, call the interact function, which pops up the dialog box
    if (this.cursors.spaceBar.isDown && !this.isDialogActive) {
      this.interact(this.currentZone);
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
    }
  }
}

export default Game;
