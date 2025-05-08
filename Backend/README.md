# TensorFlow.js Prediction API

A Node.js backend API for serving TensorFlow.js model predictions without requiring the `@tensorflow/tfjs-node` package.

## Features

- RESTful API for making predictions with a TensorFlow.js model
- Works with pure JavaScript implementation of TensorFlow.js
- Custom model loading for Node.js environment
- Input validation and error handling
- Logging and monitoring
- Health check endpoint

## Prerequisites

- Node.js (v14.x or higher)
- Your TensorFlow.js model files (model.json + .bin files)

## Getting Started

1. **Clone the repository and install dependencies**

```bash
npm install
```

2. **Place your model files**

Place your model.json file and associated .bin files in the `models` directory.

```bash
mkdir -p models
# Copy your model.json and .bin files to the models directory
```

3. **Configure environment variables**

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the server**

```bash
npm run dev  # For development
npm start    # For production
```

## API Endpoints

### Health Check
```
GET /health
```

### Make Prediction
```
POST /api/predict
```

Request body:
```json
{
  "inputs": [90, 42, 43, 20.87, 82.0, 6.5, 202.9]
}
```

### Get Model Info
```
GET /api/model-info
```

## Example Usage

```bash
# Make a prediction
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"inputs": [90, 42, 43, 20.87, 82.0, 6.5, 202.9]}'

# Get model info
curl http://localhost:3000/api/model-info
```

## Folder Structure

```
.
├── logs/               # Log files
├── models/             # TensorFlow.js model files
├── src/
│   ├── config.js       # Application configuration
│   ├── controllers/    # Request handlers
│   ├── index.js        # Application entry point
│   ├── middleware/     # Express middleware
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── utils/          # Utility functions
├── .env                # Environment variables (not in repo)
├── .env.example        # Example environment variables
├── package.json        # Dependencies and scripts
└── README.md           # Documentation
```

## Notes

This implementation uses the browser version of TensorFlow.js running in Node.js as an alternative to `@tensorflow/tfjs-node`. Performance may be slower compared to the native Node.js implementation.