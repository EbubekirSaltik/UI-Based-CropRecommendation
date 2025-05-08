# Model Directory

Place your TensorFlow.js model files in this directory.

The model should consist of:
- A `model.json` file (main model architecture and metadata)
- One or more `.bin` files (model weights)

## Example Structure

```
models/
│
├── model.json
├── weights.bin
└── ...
```

## Configuration

Update the `MODEL_PATH` in your `.env` file to point to your model.json file:

```
MODEL_PATH=./models/model.json
```

## Notes

- The default path is `./models/model.json`
- Make sure all weight files referenced in your model.json are in the same directory