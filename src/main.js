import "./style.css";

// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
// https://openweathermap.org/api

let now = new Date();

let hours = now.getHours();

let greetingText = "Good evening!";
if (hours < 12) {
  greetingText = "Good morning!";
}

const greetingTextEl = document.createElement("h1");
const weatherEmojiEl = document.createElement("div");

greetingTextEl.id = "greetingText";
greetingTextEl.textContent = greetingText;

weatherEmojiEl.id = "weatherEmoji";
navigator.geolocation.getCurrentPosition(
  (position) => {
    greetingTextEl.textContent += " 🙂";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        position.coords.latitude
      }&lon=${position.coords.longitude}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        const weatherDescription = data.weather[0].description.toLowerCase();

        if (weatherDescription.includes("clouds")) {
          weatherEmojiEl.textContent = "☁️";
        } else if (weatherDescription.includes("rain")) {
          weatherEmojiEl.textContent = "🌧️";
        } else {
          weatherEmojiEl.textContent = "☀️";
        }
      });
  },
  () => {
    greetingTextEl.textContent += " 😞";
  }
);

document.body.appendChild(greetingTextEl);
document.body.appendChild(weatherEmojiEl);
