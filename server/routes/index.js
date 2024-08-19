const express = require('express');
const investorsController = require('../controllers/investors');
const committmentsController = require('../controllers/comittments');

const router = express.Router();

router.use('/api/investors', investorsController);
router.use('/api/commitments/:name', committmentsController);

module.exports = router;
