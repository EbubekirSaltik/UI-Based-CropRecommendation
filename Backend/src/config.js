require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
  modelPath: process.env.MODEL_PATH || './models/model.json',
  logLevel: process.env.LOG_LEVEL || 'info'
};

module.exports = { config };