function checkTimeAndSetLampje() {
    const now = new Date();
    const targetHour = 14; 
    const targetMinute = 22; 

    if (now.getHours() === targetHour && now.getMinutes() === targetMinute) {
        GetData().then(data => {
            console.log("JSON data:", data);

            if (!data.lights.LED2) {
                SetLampje(2, true); 
                console.log("Lampje AAN gezet om 12:50.");
            } else {
                console.log("Lampje stond al aan.");
            }
        });
    }
}

setInterval(checkTimeAndSetLampje, 1000);

