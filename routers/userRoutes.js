const express = require('express');
const userrouter = express.Router();
const userController = require('../controllers/userController');

userrouter.post('/users', userController.createUser);
userrouter.put('/users/:id', userController.updateUser);
userrouter.delete('/users/:id', userController.deleteUser);
userrouter.get('/users/:id', userController.getUserById);
userrouter.get('/users', userController.getAllUsers);

module.exports = userrouter;
