const router = require("express").Router();

const appRouter = require("./appRouter");
const userRouter = require('./userRouter')

router.use('/movies',  appRouter);
router.use('/users',  userRouter);


module.exports = router;