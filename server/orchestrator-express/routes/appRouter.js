const AppController = require("../controller/app");

const router =  require("express").Router();

router.get("/", AppController.getMovies);
router.get("/:id", AppController.getMovieDetails);
router.post("/", AppController.addMovie);
router.put("/:id", AppController.editMovie);
router.delete("/:id", AppController.deleteMovie);

module.exports = router;
