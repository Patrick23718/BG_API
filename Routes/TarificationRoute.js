const express = require('express');
const tarificationController = require('../Controllers/tarificationControler');

const router = express.Router();

// Creer un nouvel utilisateur client
router.post('/', tarificationController.createTarification);
router.get('/:uid', tarificationController.getAllCoiffeuseTarification);
router.get('/:CoiffeuseId/:id', tarificationController.getCoiffeuseTarification);
router.put('/:CoiffeuseId/:id', tarificationController.updateTarification);
router.delete('/:CoiffeuseId/:id', tarificationController.deleteTarification);


module.exports = {
    routes: router
}