import express from 'express';
const controller = require('../controllers/userController');
const router = express.Router();
const { check } = require('express-validator');


router.post('/registration', [
    check ('email', 'User email shoud not be empty').notEmpty(),
    check ('password', 'User password should be with min 4 signs').isLength({min:4})
], controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;