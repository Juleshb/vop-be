'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.hasMany(models.AudioTrack, { as: 'tracks' });
    }
  }
  Album.init({
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    release_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};