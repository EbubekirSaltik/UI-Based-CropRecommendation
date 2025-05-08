const express = require('express');
const { predictionController } = require('../controllers/prediction.controller');
const { validatePredictionInput } = require('../middleware/validation');

const router = express.Router();

/**
 * @route POST /api/predict
 * @desc Make a prediction using the loaded model
 * @access Public
 */
router.post('/predict', validatePredictionInput, predictionController.makePrediction);

/**
 * @route GET /api/model-info
 * @desc Get information about the loaded model
 * @access Public
 */
router.get('/model-info', predictionController.getModelInfo);

const predictionRoutes = router;

module.exports = { predictionRoutes };