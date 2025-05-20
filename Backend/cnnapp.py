from flask import Flask, request, jsonify
import numpy as np
import pickle
import json
from flask_cors import CORS 

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
# Load artifacts
model = pickle.load(open('models/cnnModel.pkl', 'rb'))
scaler = pickle.load(open('models/standartScaler.pkl', 'rb')) 
label_encoder = pickle.load(open('models/label_encoder.pkl', 'rb'))  # Use whichever scaler you trained
with open('crop_mapping.json') as f:
    crop_mapping = json.load(f)

# Reverse mapping for prediction output
crop_dict = {int(k): v for k, v in crop_mapping.items()}  # Handle JSON key->str conversion

@app.route('/predict', methods=['POST'])

def predict():
    try:
        data = request.get_json() if request.is_json else request.form
        # Match EXACTLY with your training columns ['N','P','K','temperature','humidity','ph','rainfall']
        required = ['nitrogen', 'phosphorus', 'potassium', 'temperature', 'humidity', 'ph', 'rainfall']
        if not all(key in data for key in required):
            return jsonify({"error": f"Missing parameters. Required: {required}"}), 400
        # Extract in THE SAME ORDER as training data
        feature_list = [
            float(data['nitrogen']),
            float(data['phosphorus']),
            float(data['potassium']),
            float(data['temperature']),
            float(data['humidity']),
            float(data['ph']),
            float(data['rainfall'])
        ]
        # Preprocess
        scaled_features = scaler.transform(np.array(feature_list).reshape(1, -1))
        # Predict
        probabilities = model.predict(scaled_features)[0]
        # Get top 10 indices with highest probabilities
        top_10_indices = np.argsort(probabilities)[::-1][:10]  # descending order
# Map to crop labels (assuming label_encoder or a list of crop names)
        top_10_crops = [(label_encoder.inverse_transform([i])[0], float(probabilities[i].item())) for i in top_10_indices]
        # params = {key: data[key] for key in required}
        return jsonify({
            "status": "success",
            "predictions": top_10_crops
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)