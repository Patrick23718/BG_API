const express = require('express');
const prestationController = require('../Controllers/prestationControler');
const upload = require('../utils/upload')

const router = express.Router();

// Creer un nouvel utilisateur client
router.post('/', upload.single('photoURL'), prestationController.createPrestation);
router.get('/', prestationController.getAllPrestaion);
router.get('/:pid/:id', prestationController.getPrestationType);
router.put('/:id', upload.single('photoURL'), prestationController.addPrestationType);
router.put('/sub/:id', prestationController.removePrestationType);
router.delete('/:id', prestationController.deletePrestation);


module.exports = {
    routes: router
}