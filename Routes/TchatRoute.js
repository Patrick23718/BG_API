const express = require('express');
const tchatController = require('../Controllers/tchatControler');
const upload = require('../utils/upload')

const router = express.Router();

router.post("/", upload.single('fileURL'), tchatController.sendMessage);
router.get('/:uid', tchatController.getUserMessages)


module.exports = {
    routes: router
}