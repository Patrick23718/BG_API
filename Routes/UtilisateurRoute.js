const express = require('express');
const userController = require('../Controllers/UtilisateurController');
const upload = require('../utils/upload')

const router = express.Router();

// Creer un nouvel utilisateur client
router.post('/Users/', userController.createUser);
router.get('/Users/all', userController.allFireBaseUser);
router.get('/Users/Uid/:id', userController.getUserByUId);
router.get('/Users/role/:id', userController.getUserRole);
router.get('/Users/email/:email', userController.getOneByEmail);
router.put('/Users/update/:id', userController.updateUserByUid);
router.put('/Users/photo/:id', upload.single('photoURL'), userController.addUSerPhotoUrl);
router.get('/Users/resetPass/:email', userController.generateResetPasswordCode);
router.delete('/Users/deleteUser/:id', userController.removeUser)

module.exports = {
    routes: router
}