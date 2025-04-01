function checkTimeAndSetLampje() {
    const now = new Date();
    const targetHour = 11; 
    const targetMinute = 30; 

    if (now.getHours() === targetHour && now.getMinutes() === targetMinute) {
        GetData().then(data => {
            console.log("JSON data:", data);

            if (!data.lights.LED1) {
                SetLampje(1, true);
                console.log("Lampje AAN gezet om 11:30.");
            } else {
                console.log("Lampje stond al aan.");
            }
        });
    }
}

setInterval(checkTimeAndSetLampje, 60000);
