function checkTimeAndSetLampje() {
    const now = new Date();
    const targetHour = 12; 

    if (now.getHours() >= targetHour) {
        GetData().then(data => {
            console.log("JSON data:", data);

            if (!data.lights.LED2) {
                 SetLampje(2, true); 
                console.log("Lampje 2 is AAN gezet om 3 uur of later.");
            } else {
                console.log("Lampje 2 stond al aan.");
            }
        });
    }
}

setInterval(checkTimeAndSetLampje, 1000);

