const express = require('express');
const planingController = require('../Controllers/planingControler');

const router = express.Router();

router.post("/", planingController.addPlaning);
router.get('/:uid/:date', planingController.getCoiffeusePlaning)
router.delete('/:uid/:date/:plage', planingController.deleteCoiffeusePlaning)
module.exports = {
    routes: router
}