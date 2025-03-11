function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function startOfWeek(date) {
    const d = new Date(date);
    const diff = d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1);
    d.setDate(diff);
    return d;
}
function endOfWeek(date) {
    const start = startOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
}

const now = new Date();

const apiUrlDay = 'https://api.open-meteo.com/v1/forecast?' +
    'latitude=52.386718' +
    '&longitude=4.846544' +
    '&daily=sunrise,sunset' +
    '&timezone=Europe%2FBerlin' +
    '&start_date=' + formatDate(now) +
    '&end_date=' + formatDate(now);

const apiUrlWeek = 'https://api.open-meteo.com/v1/forecast?' +
    'latitude=52.386718' +
    '&longitude=4.846544' +
    '&daily=temperature_2m_max,temperature_2m_min' +
    '&timezone=Europe%2FBerlin' +
    '&start_date=' + formatDate(startOfWeek(now)) +
    '&end_date=' + formatDate(endOfWeek(now));

async function getData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function main() {
    const dataDay = await getData(apiUrlDay);
    const dataWeek = await getData(apiUrlWeek);
    if (!dataDay || !dataWeek) return;

    console.log('dataDay:', dataDay);
    console.log('dataWeek:', dataWeek);

    //dayly sunrise and sunset
    const sunrise = dataDay.daily.sunrise[0];
    const sunset = dataDay.daily.sunset[0];
    const simplifiedSunrise = sunrise.split('T')[1]; // from "2025-02-28T06:28" to "06:28"
    const simplifiedSunset = sunset.split('T')[1]; // from "2025-02-28T17:17" to "17:17"

    const sunriseH3 = document.getElementById("sunrise");
    const sunsetH3 = document.getElementById("sunset");

    sunriseH3.innerHTML = `Sunrise: ${simplifiedSunrise}`;
    sunsetH3.innerHTML = `Sunset: ${simplifiedSunset}`;

    //weekly weather
    const xValues = ["ma", "di", "wo", "do", "vr", "za", "zo"];

    const ctx = document.getElementById("WeatherChart").getContext("2d");
    if (!ctx) {
        console.error('Canvas element not found');
        return;
    }

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                label: "Max. Temp",
                data: dataWeek.daily.temperature_2m_max,
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.5)"  // added background color
            }, {
                label: "Min. Temp",
                data: dataWeek.daily.temperature_2m_min,
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.5)"  // added background color
            }]
        },
        options: {
            legend: { display: true },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

main();