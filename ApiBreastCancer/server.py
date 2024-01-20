import numpy as np
import pandas as pd
import requests
import json
from sklearn.preprocessing import MinMaxScaler
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import warnings
warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)
# Import model
model = pickle.load(open('model.pkl','rb'))

# Create the scaler
df = pd.read_csv('https://raw.githubusercontent.com/SergioManuelJob/data/master/BreastCancer.csv')
scaler = MinMaxScaler()

selected_columns = ['texture_worst', 'area_worst', 'smoothness_worst', 'concavity_worst']
df = df[selected_columns]

scaler.fit_transform(df)


@app.route('/api',methods=['POST'])
def predict():
    data = request.get_json(force=True)
    # Convertimos los datos a un datafrane
    input_data = pd.DataFrame({
        'texture_worst': [data["texture_worst"]],
        'area_worst': [data["area_worst"]],
        'smoothness_worst': [data["smoothness_worst"]],
        'concavity_worst': [data["concavity_worst"]]
    })
    # Los escalamos con el scaler que creé antes
    input_data = scaler.transform(input_data)
    prediction = model.predict(input_data)
    output = prediction[0]
    return jsonify(output)

if __name__ == '__main__':
    app.run(port=5000, debug=True)