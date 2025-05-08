const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { config } = require('./config');
const { logger } = require('./utils/logger');
const { predictionRoutes } = require('./routes/prediction.routes');
const { errorHandler } = require('./middleware/errorHandler');
const { notFoundHandler } = require('./middleware/notFoundHandler');

// Initialize app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api', predictionRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});