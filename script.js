let chart;

function predictClimate() {
  const place = document.getElementById("place").value;
  const date = document.getElementById("date").value;

  if (!place || !date) {
    alert("Please enter place and date");
    return;
  }

  console.log("Requesting prediction...");

  fetch(`http://127.0.0.1:5000/predict?place=${place}&date=${date}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log("Prediction received:", data);

      if (data.error) {
        alert(data.error);
        return;
      }

      const predictedTemp = data.predicted_temp;
      const climateChange = data.climate_change;

      document.getElementById("locationTitle").innerText =
        `Climate Prediction for ${place}`;

      document.getElementById("predTemp").innerText =
        predictedTemp + " °C";

      document.getElementById("climateChangeTemp").innerText =
        climateChange > 0
          ? `+${climateChange} °C (Increase)`
          : `${climateChange} °C (Decrease)`;

      document.getElementById("highTemp").innerText =
        (predictedTemp + 2).toFixed(1) + " °C";

      document.getElementById("lowTemp").innerText =
        (predictedTemp - 2).toFixed(1) + " °C";

      setWeatherIcon(predictedTemp, climateChange);
      drawChart(predictedTemp);

      document.getElementById("result").classList.remove("hidden");
      document.querySelector(".graph-card").classList.remove("hidden");
    })
    .catch(error => {
      console.error("Fetch failed:", error);
      alert("Backend connection failed");
    });
}
/*
function setWeatherIcon(temp, change) {
  const icon = document.getElementById("weatherIcon");

  if (temp > 30) icon.innerHTML = "☀️";
  else if (temp < 10) icon.innerHTML = "❄️";
  else if (change < 0) icon.innerHTML = "🌧️";
  else icon.innerHTML = "🍃";
}
*/
function setWeatherIcon(temp, change) {
  const icon = document.getElementById("weatherIcon");
  const rain = document.getElementById("rainLayer");
  const clouds = document.getElementById("cloudLayer");
  const snow = document.getElementById("snowLayer");

  // Reset all layers
  rain.classList.add("hidden");
  clouds.classList.add("hidden");
  snow.classList.add("hidden");

  // ❄️ Snowy weather
  if (temp <= 10) {
    icon.innerHTML = "❄️";
    snow.classList.remove("hidden");
  }

  // ☀️ Sunny weather
  else if (temp >= 30) {
    icon.innerHTML = "☀️";
  }

  // 🌧️ Rainy + clouds
  else if (change < -0.3 && temp >= 15 && temp < 28) {
    icon.innerHTML = "🌧️";
    rain.classList.remove("hidden");
    clouds.classList.remove("hidden");
  }

  // ⛅ Cloudy
  else if (change > 0.5) {
    icon.innerHTML = "⛅";
    clouds.classList.remove("hidden");
  }

  // 🍃 Pleasant climate
  else {
    icon.innerHTML = "🍃";
  }
}


function drawChart(baseTemp) {
  const temps = Array.from({ length: 7 }, () =>
    baseTemp + (Math.random() * 4 - 2)
  );

  const ctx = document.getElementById("climateChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Weekly Temperature Trend (°C)",
        data: temps,
        borderColor: "#ff9800",
        backgroundColor: "rgba(255,152,0,0.2)",
        tension: 0.4,
        fill: true
      }]
    }
  });
}
