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

const apiUrlWeek = 'https://api.open-meteo.com/v1/forecast?' +
    'latitude=52.386718' +
    '&longitude=4.846544' +
    '&daily=temperature_2m_max,temperature_2m_min' +
    '&timezone=Europe%2FBerlin' +
    '&start_date=' + formatDate(startOfWeek(now)) +
    '&end_date=' + formatDate(endOfWeek(now));

async function getData() {
    try {
        const response = await fetch(apiUrlWeek);
        const json = await response.json();

        console.log(json);

        if (!json.daily) {
            throw new Error("Geen dagelijkse gegevens gevonden in de API-respons.");
        }

        const daily = json.daily;

        let dateOptions = { weekday: "short", day: "2-digit", month: "short" };

        let tableRows = `
            <tr>
                <td class='beschrijving'>Datum</td>
                ${daily.time.map(timestamp => `<td class='cel'>${new Date(timestamp * 1000).toLocaleDateString("nl-NL", dateOptions)}</td>`).join("")}
            </tr>
            <tr>
                <td class='beschrijving'>Min. Temp.</td>
                ${daily.temperature_2m_min.map(temp => `<td class='cel'>${temp}°C</td>`).join("")}
            </tr>
            <tr>
                <td class='beschrijving'>UV Index Max.</td>
                ${daily.uv_index_max.map(uv => `<td class='cel'>${uv}</td>`).join("")}
            </tr>
            <tr>
                <td class='beschrijving'>Neerslag</td>
                ${daily.rain_sum.map(rain => `<td class='cel'>${rain} mm</td>`).join("")}
            </tr>
            <tr>
                <td class='beschrijving'>Windstoten</td>
                ${daily.wind_gusts_10m_max.map(wind => `<td class='cel'>${wind} km/h</td>`).join("")}
            </tr>
        `;

        document.getElementById("weather-table").innerHTML = tableRows;

    } catch (error) {
        console.error("Fout bij ophalen van gegevens:", error);
    }
}

getData();