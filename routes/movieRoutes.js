const express = require("express");
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/movies", getAllMovies);
router.get("/movie/:id", getMovieById);
router.post("/movie", createMovie);
router.put("/movie/:id", updateMovie);
router.delete("/movie/:id", deleteMovie);

module.exports = router;
