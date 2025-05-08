const { logger } = require('../utils/logger');

/**
 * Validate prediction input
 */
const validatePredictionInput = (req, res, next) => {
  const { inputs } = req.body;
  
  // Check if inputs exist
  if (!inputs) {
    logger.warn('Missing inputs in request');
    return res.status(400).json({
      success: false,
      message: 'Missing required field: inputs'
    });
  }
  
  // Validate inputs is an array
  if (!Array.isArray(inputs)) {
    logger.warn('Inputs must be an array');
    return res.status(400).json({
      success: false,
      message: 'Inputs must be an array of numbers'
    });
  }
  
  // Check we have the right number of inputs (7 in your example)
  if (inputs.length !== 7) {
    logger.warn(`Invalid input length: expected 7, got ${inputs.length}`);
    return res.status(400).json({
      success: false,
      message: 'Invalid input: expected 7 values [N, P, K, temperature, humidity, ph, rainfall]'
    });
  }
  
  // Check all inputs are numbers
  if (!inputs.every(value => typeof value === 'number')) {
    logger.warn('All inputs must be numbers');
    return res.status(400).json({
      success: false,
      message: 'All inputs must be numeric values'
    });
  }
  
  next();
};

module.exports = { validatePredictionInput };