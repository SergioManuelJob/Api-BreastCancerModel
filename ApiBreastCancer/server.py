import numpy as np
import requests
import json
from flask import Flask, request, jsonify
import pickle
import warnings
warnings.filterwarnings("ignore")

app = Flask(__name__)
model = pickle.load(open('model.pkl','rb'))

@app.route('/api',methods=['POST'])
def predict():
    data = request.get_json(force=True)
    texture, area, smoothness, concavity = data["texture_worst"], data["area_worst"], data["smoothness_worst"], data["concavity_worst"]
    prediction = model.predict([[texture, area, smoothness, concavity]])
    output = prediction[0]
    return jsonify(output)

if __name__ == '__main__':
    app.run(port=5000, debug=True)