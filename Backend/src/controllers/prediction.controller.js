const { modelService } = require('../services/model.service');
const { logger } = require('../utils/logger');

const predictionController = {
  /**
   * Make a prediction with the loaded model
   */
  async makePrediction(req, res, next) {
    try {
      const { inputs } = req.body;
      
      // Ensure the model is loaded
      if (!modelService.isModelLoaded()) {
        await modelService.loadModel();
      }
      
      // Make prediction
      const prediction = await modelService.predict(inputs);
      
      return res.status(200).json({
        success: true,
        prediction,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error(`Prediction error: ${error.message}`);
      next(error);
    }
  },

  /**
   * Get information about the loaded model
   */
  async getModelInfo(req, res, next) {
    try {
      // Ensure the model is loaded
      if (!modelService.isModelLoaded()) {
        await modelService.loadModel();
      }
      
      const modelInfo = modelService.getModelInfo();
      
      return res.status(200).json({
        success: true,
        modelInfo,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error(`Model info error: ${error.message}`);
      next(error);
    }
  }
};

module.exports = { predictionController };