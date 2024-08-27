const pool = require('../config/database');
exports.getAllMovies = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const { title, duration, genre_id } = req.body;
    const result = await pool.query(
      'INSERT INTO movies (title, duration, genre_id) VALUES ($1, $2, $3) RETURNING *',
      [title, duration, genre_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, duration, genre_id } = req.body;
    const result = await pool.query(
      'UPDATE movies SET title = $1, duration = $2, genre_id = $3 WHERE id = $4 RETURNING *',
      [title, duration, genre_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
