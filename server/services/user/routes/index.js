const Controller = require('../controllers');

const router = require('express').Router()


router.get('/', Controller.findAllUsers)
router.get('/:_id', Controller.findUserById)
router.post('/', Controller.createUser)
router.delete('/:_id',Controller.deleteUser)


module.exports = router;