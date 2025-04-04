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
    '&daily=sunrise,sunset,temperature_2m_min,temperature_2m_max' +   
    '&timezone=Europe%2FBerlin' +
    '&start_date=' + formatDate(now) +
    '&end_date=' + formatDate(now);

const apiUrlWeek = 'https://api.open-meteo.com/v1/forecast?' +
    'latitude=52.386718' +
    '&longitude=4.846544' +
    '&daily=temperature_2m_max,temperature_2m_min,uv_index_max,rain_sum,wind_gusts_10m_max,daylight_duration' +
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

    const sunriseH3 = document.getElementById("sunrise");
    const sunsetH3 = document.getElementById("sunset");
    const maxTemp = document.getElementById("maxTempText");
    const minTemp = document.getElementById("minTempText");

    // jesper zijn dingen
    setWeatherData(dataWeek);

    //set brams text data
    setDiscripie(dataDay);

    //dayly sunrise and sunset
    sunsetSunrise(dataDay);

    //weekly weather chart.js
    setChartData(dataWeek);
}


function setWeatherData(data) {
    if (!data.daily) {
        throw new Error("Geen dagelijkse gegevens gevonden in de API-respons.");
    }

    const daily = data.daily;

    const infill = [
        ["Datum", ["ma", "di", "wo", "do", "vr", "za", "zo"], ""],
        ["Max uv", daily.uv_index_max, ""],
        ["rain", daily.rain_sum, " mm"],
        ["wind gusts", daily.wind_gusts_10m_max, " m/s"],
        ["max Temp", daily.temperature_2m_max, "°C"]
        
    ];

    let tableRows = "";

    for (let i = 0; i < infill.length; i++) {
        tableRows = tableRows + '\n <tr><td class="beschrijving">' + infill[i][0] + '</td>';
        for (let j = 0; j < infill[i][1].length; j++) {
            tableRows = tableRows + '<td class="cel">' + infill[i][1][j] + infill[i][2] + '</td>';
        }
        tableRows = tableRows + '</tr>';
    }

    document.getElementById("weather-table").innerHTML = tableRows;
}

function setDiscripie(data) {
    if (sunriseH3 != null)
        maxTemp.innerHTML = "🌡️ Max: "+ data.daily.temperature_2m_max[0]+"°C";
    
    if (sunriseH3 != null)
        minTemp.innerHTML = "🌡️ Min: "+ data.daily.temperature_2m_min[0]+"°C";
}

function sunsetSunrise(data) {
    const sunrise = data.daily.sunrise[0];
    const sunset = data.daily.sunset[0];
    const simplifiedSunrise = sunrise.split('T')[1]; 
    const simplifiedSunset = sunset.split('T')[1]; 

    if (sunriseH3 != null)
        sunriseH3.innerHTML = `Sunrise: ${simplifiedSunrise}`;
    
    if (sunsetH3 != null)
        sunsetH3.innerHTML = `Sunset: ${simplifiedSunset}`;
    

}

function setChartData(data) {
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
                data: data.daily.temperature_2m_max,
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.5)"  
            }, {
                label: "Min. Temp",
                data: data.daily.temperature_2m_min,
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.5)"  
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


setInterval(fetchPrice, 60000); // Elke 60 seconden verversen
fetchPrice();

main(); 