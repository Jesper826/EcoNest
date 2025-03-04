
/// clock left corner
function updateTime() {
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    var t_str = hours + ":" + minutes + " ";
    document.getElementById('TextShadow').innerHTML = t_str;
}
setInterval(updateTime, 1000);
// calling the function for the first time so that it does not show the default time
updateTime();

function startOfWeek(date) {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? - 6 : 1);
    return new Date(date.setDate(diff));
}

const apiUrl = 'https://api.open-meteo.com/v1/forecast?' +
    'latitude=52.386718' +
    '&longitude=4.846544' +
    '&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset' +
    '&timezone=Europe%2FLondon' +
    '&start_date=2025-02-28' +
    '&end_date=2025-02-28';

async function getWeatherData() {
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

$data = getWeatherData();


const sunsetToday = $data.daily.sunset[0];
const sunriseToday = $data.daily.sunrise[0];

console.log("Sunset Today:", sunsetToday);
console.log("Sunrise Today:", sunriseToday);

// Create an array for min and max temperatures for each day in the week
// (Even if the API currently returns one day, this will work for multiple days)
const weeklyTemps = $data.daily.time.map((date, index) => ({
    date,
    minTemp: $data.daily.temperature_2m_min[index],
    maxTemp: $data.daily.temperature_2m_max[index]
}));

console.log("Weekly Temperature Data:", weeklyTemps);




const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 6830, 2478],
            borderColor: "red",
            fill: false
        }, {
            data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
            borderColor: "green",
            fill: false
        }, {
            data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
            borderColor: "blue",
            fill: false,
        }]
    },
    options: {
        legend: { display: true }
    }
});