'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Movies',
      [
        {
          title: 'The Dark Knight',
          genre: 'Action',
          releaseDate: '2008-07-18',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Inception',
          genre: 'Sci-Fi',
          releaseDate: '2010-07-16',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'The Matrix',
          genre: 'Sci-Fi',
          releaseDate: '1999-03-31',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Interstellar',
          genre: 'Sci-Fi',
          releaseDate: '2014-11-07',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Pulp Fiction',
          genre: 'Crime',
          releaseDate: '1994-10-14',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'The Godfather',
          genre: 'Crime',
          releaseDate: '1972-03-24',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'The Shawshank Redemption',
          genre: 'Drama',
          releaseDate: '1994-09-23',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'The Lord of the Rings: The Fellowship of the Ring',
          genre: 'Fantasy',
          releaseDate: '2001-12-19',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Gladiator',
          genre: 'Action',
          releaseDate: '2000-05-05',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Forrest Gump',
          genre: 'Drama',
          releaseDate: '1994-07-06',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
  },
};
