async function getData() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=uv_index_max,rain_sum,wind_gusts_10m_max,temperature_2m_min,daylight_duration&timezone=Europe%2FBerlin&timeformat=unixtime";
    
    try {
        const response = await fetch(url);
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