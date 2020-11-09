import Phaser from 'phaser'

const createMapLayer = (layer, tileset) => {

  return map.createStaticLayer(layer , tileset, 0, 0);
}

module.exports = createMapLayer