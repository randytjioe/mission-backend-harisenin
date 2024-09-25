const { Op } = require('sequelize');
const Movie = require('../models/Movie'); 

exports.getMovies = async (req, res) => {
  try {
    const { genre, sortBy, search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit; 
    const query = {};

    if (genre) {
      query.genre = genre; 
    }

    if (search) {
      query.title = { [Op.like]: `%${search}%` }; 
    }

    const totalItems = await Movie.count({ where: query });
    const movies = await Movie.findAll({
      where: query,
      order: sortBy ? [[sortBy, 'ASC']] : [['createdAt', 'DESC']],
      limit: parseInt(limit), 
      offset: parseInt(offset), 
    });

    const totalPages = Math.ceil(totalItems / limit);
    if (movies.length === 0) {
      return res.status(200).json({
        statusCode: 200,
        message: 'No movies found',
        page: parseInt(page),
        limit: parseInt(limit),
        totalItems: totalItems,
        totalPages: totalPages,
        data: [],
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: 'Movies fetched successfully',
      page: parseInt(page),
      limit: parseInt(limit),
      totalItems: totalItems,
      totalPages: totalPages,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Error fetching movies',
      error: error.message,
    });
  }
};

exports.addMovie = async (req, res) => {
  const { title, genre, releaseDate } = req.body;

  try {
    const newMovie = await Movie.create({
      title,
      genre,
      releaseDate,
    });

    res.status(201).json({
      statusCode: 201,
      message: 'Movie added successfully',
      data: newMovie,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Error adding movie',
      error: error.message,
    });
  }
};

exports.getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByPk(id); 

    if (!movie) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Movie not found',
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: 'Movie fetched successfully',
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Error fetching movie',
      error: error.message,
    });
  }
};

exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, genre, releaseDate } = req.body;

  try {
    const movie = await Movie.findByPk(id);

    if (!movie) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Movie not found',
      });
    }

    movie.title = title || movie.title;
    movie.genre = genre || movie.genre;
    movie.releaseDate = releaseDate || movie.releaseDate;

    await movie.save();

    res.status(200).json({
      statusCode: 200,
      message: 'Movie updated successfully',
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Error updating movie',
      error: error.message,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByPk(id);

    if (!movie) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Movie not found',
      });
    }

    await movie.destroy();

    res.status(200).json({
      statusCode: 200,
      message: 'Movie deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Error deleting movie',
      error: error.message,
    });
  }
};
