const express = require('express');
const galerieController = require('../Controllers/galerieControler');
const upload = require('../utils/upload')

const router = express.Router();

// Creer un nouvel utilisateur client
router.post('/:uid', upload.single('photoURL'), galerieController.createGalerie);
router.get('/:uid', galerieController.getGalerie);
router.delete('/:uid/:id', galerieController.deleteGalerie);


module.exports = {
    routes: router
}