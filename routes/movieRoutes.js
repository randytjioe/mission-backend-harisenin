const express = require('express');
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware.verifyToken, movieController.getMovies);
router.post('/', authMiddleware.verifyToken, movieController.addMovie);
router.get('/:id', authMiddleware.verifyToken, movieController.getMovieById);
router.put('/:id', authMiddleware.verifyToken, movieController.updateMovie);
router.delete('/:id', authMiddleware.verifyToken, movieController.deleteMovie);

module.exports = router;
