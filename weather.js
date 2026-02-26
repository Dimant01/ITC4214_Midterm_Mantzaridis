document.addEventListener('DOMContentLoaded', () => {
    const weatherStatus = document.querySelector('#weather-status');

    const API_KEY = "4f01f0b945ff218afa20d31b9841d103";
    const CITY = "Athens";

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherStatus.innerHTML = "Failed to load weather data.";
            console.error(error);
        });

    function getDayName(dateString) {
        const date = new Date(dateString);
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        const compareDate = new Date(date);
        compareDate.setHours(0, 0, 0, 0);

        const diffTime = compareDate - today;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Tomorrow";

        return date.toLocaleDateString('en-US', { weekday: 'long' });
    }

    function groupByDay(forecastList) {
        const days = {};

        forecastList.forEach(item => {
            const date = item.dt_txt.split(" ")[0];

            if (!days[date]) {
                days[date] = [];
            }

            days[date].push(item);
        });

        return days;
    }

    function displayWeather(data) {
        const forecastList = data.list;
        const grouped = groupByDay(forecastList);

        const dates = Object.keys(grouped).slice(0, 5);

        const forecastHTML = dates.map(date => {
            const dayData = grouped[date];

            // ✅ Min / Max temps
            const temps = dayData.map(item => item.main.temp);
            const minTemp = Math.min(...temps);
            const maxTemp = Math.max(...temps);

            const condition = dayData[0].weather[0].main;

            const avgWind = dayData.reduce((sum, item) => sum + item.wind.speed, 0) / dayData.length;

            let icon = "☀️";
            if (condition === "Clouds") icon = "🌥️";
            if (condition === "Rain") icon = "🌧️";
            if (condition === "Thunderstorm") icon = "⛈️";

            let usability = "Usable ✅";
            let statusClass = "usable";

            if (condition === "Rain" || condition === "Thunderstorm") {
                usability = "Not usable 🌧️";
                statusClass = "not-usable";
            }

            if (avgWind > 10) {
                usability += " ⚠️ Windy";
                if (statusClass === "usable") statusClass = "warning";
            }

            return `
                <div class="weather-day">
                    <span class="day-name">${getDayName(date)}</span>
                    <span class="weather-icon">${icon}</span>
                    <span class="temp">
                        <span class="min">L: ${minTemp.toFixed(1)}°C</span>
                        <span class="max">H: ${maxTemp.toFixed(1)}°C</span>
                    </span>
                    <span class="venue-status ${statusClass}">${usability}</span>
                </div>
            `;
        }).join('');

        weatherStatus.innerHTML = forecastHTML;
    }
});