const express = require('express');
const router = express.Router();
const congeController = require('../controllers/congeController');


router.get('/',  congeController.getAllConges);
router.post('/',  congeController.createConge);
router.put('/:id',  congeController.updateCongeStatus);

module.exports = router;
