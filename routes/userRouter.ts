import express from 'express';
const controller = require('../controllers/userController');
const router = express.Router();
const {check} = require('express-validator');


router.post('/registration',  controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;