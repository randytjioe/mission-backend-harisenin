const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Movie = sequelize.define(
  'Movie',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'Movies',
  }
);

Movie.sync();

module.exports = Movie;
