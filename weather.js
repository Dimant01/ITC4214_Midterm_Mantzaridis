// ===== WEATHER WIDGET =====
document.addEventListener('DOMContentLoaded', () => {
    const weatherStatus = document.querySelector('#weather-status');

    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    const randomChoice = arr => arr[Math.floor(Math.random() * arr.length)];

    const conditions = [
        { name: "Clear", icon: "☀️" },
        { name: "Clouds", icon: "🌥️" },
        { name: "Rain", icon: "🌧️" },
        { name: "Thunderstorm", icon: "⛈️" }
    ];

    const mockForecast = Array.from({ length: 5 }, (_, i) => {
        const temp = randomInRange(15, 35);
        const condition = randomChoice(conditions);
        const wind = randomInRange(0, 15);

        let usability = "Usable ✅";
        let statusClass = "usable";

        if (condition.name.toLowerCase() === "rain" || condition.name.toLowerCase() === "thunderstorm") {
            usability = "Not usable 🌧️";
            statusClass = "not-usable";
        }
        if (wind > 10) {
            usability += " ⚠️ Windy";
            if (statusClass === "usable") statusClass = "warning";
        }

        return { day: `Day ${i+1}`, temp, condition, wind, usability, icon: condition.icon, statusClass };
    });

    // Build HTML
    const forecastHTML = mockForecast.map(d => `
        <div class="weather-day">
            <span class="day-name">${d.day}</span>
            <span class="weather-icon">${d.icon}</span>
            <span class="temp">${d.temp.toFixed(1)}°C</span>
            <span class="venue-status ${d.statusClass}">${d.usability}</span>
        </div>
    `).join('');

    weatherStatus.innerHTML = forecastHTML;
});