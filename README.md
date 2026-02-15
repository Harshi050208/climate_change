# 🌍 Climate Change Prediction Dashboard

An interactive web-based system that predicts climate trends using historical environmental data and visually represents weather conditions through dynamic animations (sun, rain, clouds, snow, pleasant atmosphere).

The project integrates a **Flask backend** with a **JavaScript frontend dashboard** to provide understandable climate insights for users.

---

## 🚀 Features

* Predict climate change using date input
* Shows:

  * Predicted temperature
  * Climate change anomaly
  * Weekly high & low estimate
* Visual weather interpretation:

  * ☀️ Sunny
  * ☁️🌧️ Cloudy & Rainy
  * ❄️ Snowfall animation
  * 🍃 Pleasant climate
* Animated weather effects:

  * Moving clouds
  * Falling rain drops
  * Falling snow
* Interactive temperature trend graph
* Desktop-optimized UI

---

## 🧠 How It Works

1. User enters **place** and **date**
2. Frontend sends request to Flask API
3. Backend reads dataset and computes:

   * Monthly average temperature
   * Climate anomaly
4. Backend returns prediction as JSON
5. Frontend updates:

   * Weather animation
   * Values & graph

---

## 🏗️ Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript

**Backend**

* Python
* Flask
* Pandas

**Dataset**

* Combined climate dataset (temperature, anomaly, environmental indicators)

---

## 📁 Project Structure

```
climate change/
│── app.py
│── global_climate_dataset.csv
│── index.html
│── style.css
│── script.js
│── README.md
```

## 🌦️ Weather Logic

| Condition        | Display   |
| ---------------- | --------- |
| Temp ≥ 30°C      | Sunny ☀️  |
| Temp ≤ 10°C      | Snow ❄️   |
| Negative anomaly | Rain 🌧️  |
| Positive anomaly | Cloudy ⛅  |
| Stable climate   | Breeze 🍃 |

---

## 🎯 Purpose of Project

This project demonstrates how climate data can be transformed into an intuitive user-friendly interface.
Instead of raw numbers, users understand climate impact through visual environmental cues.

---


## 🔮 Future Improvements

* Machine learning prediction model (Regression / LSTM)
* Region-based prediction
* Seasonal climate simulation
* Map-based selection
* Climate risk scoring
