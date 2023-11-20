const MovieController = require("../controllers/movieController");
const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Hello World!");
});


router.get("/movies", MovieController.getMovies);
router.get("/movies/:id", MovieController.getMovieDetails);
router.post("/movies", MovieController.addMovie);
router.put("/movies/:id", MovieController.editMovie);
router.delete("/movies/:id", MovieController.deleteMovie);

module.exports = router;
