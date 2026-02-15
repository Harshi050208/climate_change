from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load dataset
df = pd.read_csv("global_climate_dataset.csv")

# Ensure date format
df['date'] = pd.to_datetime(df['date']).dt.strftime('%Y-%m-%d')

@app.route("/")
def home():
    return "Climate Prediction API is running"

@app.route("/predict", methods=["GET"])
def predict():
    place = request.args.get("place")
    date = request.args.get("date")

    if not date:
        return jsonify({"error": "Date is required"})

    # Match by month (YYYY-MM)
    month = date[:7]
    filtered = df[df['date'].str.startswith(month)]

    if filtered.empty:
        return jsonify({"error": "No data found for this date"})

    predicted_temp = round(filtered['avg_surface_temperature'].mean(), 2)
    climate_change = round(filtered['temperature_anomaly'].mean(), 2)

    return jsonify({
        "predicted_temp": predicted_temp,
        "climate_change": climate_change
    })

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
