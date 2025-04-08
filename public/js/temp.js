function updateTemperatures() {
    GetData().then(data => {
        if (data && data.dht11) {
            const binnenTemp = data.dht11.temperature; 
            const buitenTemp = data.dht11.heatIndex;  

            document.getElementById("tempBinnen").textContent = binnenTemp + "°";
            document.getElementById("tempBuiten").textContent = buitenTemp + "°";
        } else {
            console.error("Kon geen temperatuurgegevens ophalen.");
        }
    }).catch(error => {
        console.error("Fout bij het ophalen van temperatuurgegevens:", error);
    });
}

setInterval(updateTemperatures, 1000);
updateTemperatures(); 