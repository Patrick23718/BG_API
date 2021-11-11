const express = require('express');
const villeController = require('../Controllers/villeControler');

const router = express.Router();

// Creer un nouvel utilisateur client
router.post('/', villeController.createVille);
router.get('/', villeController.getVille);
router.delete('/:id', villeController.deleteVille);
router.put('/push/:id', villeController.addVille)
router.put('/pop/:id', villeController.popVille)


module.exports = {
    routes: router
}