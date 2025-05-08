const tf = require('@tensorflow/tfjs');
const path = require('path');
const fs = require('fs');
const { config } = require('../config');
const { logger } = require('../utils/logger');

// Custom file system handler for tfjs model loading in Node.js
class NodeFileSystem {
  constructor() {
    this.fs = fs;
    this.path = path;
  }

  async loadBinary(filePath) {
    return new Promise((resolve, reject) => {
      this.fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const buffer = new Uint8Array(data);
        resolve(buffer);
      });
    });
  }
}

// Initialize model variables
let model = null;
let modelMetadata = {};

const modelService = {
  /**
   * Check if the model is loaded
   */
  isModelLoaded() {
    return model !== null;
  },

  /**
   * Load the TensorFlow.js model
   */
  async loadModel() {
    try {
      logger.info(`Loading model from: ${config.modelPath}`);
      
      // Create tf IOHandler for Node.js environment
      const fileSystem = new NodeFileSystem();
      const modelPath = path.resolve(config.modelPath);
      const modelDir = path.dirname(modelPath);

      // Load model and weights manually
      const modelJSON = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
      
      // Load the model architecture
      model = await tf.loadLayersModel(tf.io.fromMemory(modelJSON));
      
      // Store model metadata
      modelMetadata = {
        name: modelJSON.modelTopology?.model_config?.config?.name || 'Unknown',
        inputShape: model.inputs.map(input => input.shape),
        outputShape: model.outputs.map(output => output.shape),
        layers: model.layers.length,
        loadedAt: new Date().toISOString()
      };
      
      logger.info('Model loaded successfully');
      return true;
    } catch (error) {
      logger.error(`Failed to load model: ${error.message}`);
      throw new Error(`Failed to load model: ${error.message}`);
    }
  },

  /**
   * Make a prediction using the loaded model
   * @param {Array} inputs - Array of input values [N, P, K, temperature, humidity, ph, rainfall]
   * @returns {Object} - Prediction results
   */
  async predict(inputs) {
    try {
      // Create tensor from inputs
      const inputTensor = tf.tensor2d([inputs]);
      
      // Run prediction
      const predictions = model.predict(inputTensor);
      
      // Convert result to JS array
      const result = await predictions.data();
      
      // Clean up tensors
      inputTensor.dispose();
      predictions.dispose();
      
      // Format prediction results
      // This will depend on your specific model output format
      // Adjust as needed for your model
      return {
        raw: Array.from(result),
        // Add any model-specific interpretation here
      };
    } catch (error) {
      logger.error(`Prediction error: ${error.message}`);
      throw new Error(`Prediction failed: ${error.message}`);
    }
  },

  /**
   * Get model information
   */
  getModelInfo() {
    if (!this.isModelLoaded()) {
      throw new Error('Model not loaded');
    }
    
    return modelMetadata;
  }
};

module.exports = { modelService };