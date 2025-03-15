from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import joblib

app = Flask(__name__)
# CORS(app)


heart_disease_model = pickle.load(open(r"C:\Users\vivek\OneDrive\Desktop\Mutiple Disease Prediction\models\heart_disease_model.sav", "rb"))
breast_cancer_model = pickle.load(open(r"C:\Users\vivek\OneDrive\Desktop\Mutiple Disease Prediction\models\Breast_cancer_model.sav", "rb"))
diabetes_model = pickle.load(open(r"C:\Users\vivek\OneDrive\Desktop\Mutiple Disease Prediction\models\diabetes_model.sav", "rb"))
parkinsons_model = pickle.load(open(r"C:\Users\vivek\OneDrive\Desktop\Mutiple Disease Prediction\models\parkinsons_model.sav", "rb"))
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    disease_type = data.get("disease_type")
    input_features = np.array([data.get("features")]).astype(float)

    if disease_type == "diabetes":
        prediction = diabetes_model.predict(input_features)[0]
    elif disease_type == "heart_disease":
        prediction = heart_disease_model.predict(input_features)[0]
    elif disease_type == "parkinsons":
        prediction = parkinsons_model.predict(input_features)[0]
    elif disease_type == "breast_cancer":
        prediction = breast_cancer_model.predict(input_features)[0]
    else:
        return jsonify({"error": "Invalid disease type"}), 400

    result = "Positive" if prediction == 1 else "Negative"
    return jsonify({"prediction": result})

if __name__ == '__main__':
    app.run(debug=True)


