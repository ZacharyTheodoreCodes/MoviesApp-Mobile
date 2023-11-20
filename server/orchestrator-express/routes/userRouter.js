const UserController = require("../controller/user");

const router =  require("express").Router();

router.get('/', UserController.findAllUsers)
router.get('/:_id', UserController.findUserById)
router.post('/', UserController.createUser)
router.delete('/:_id',UserController.deleteUser)

module.exports = router;