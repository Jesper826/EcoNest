function checkTimeAndSetLampje() {
    const now = new Date();
    const targetHour = 15; // 3 uur 's middags

    // Controleer of het 3 uur of later is
    if (now.getHours() >= targetHour) {
        GetData().then(data => {
            console.log("JSON data:", data);

            // Controleer of LED2 uit staat
            if (!data.lights.LED2) {
                SetLampje(2, true); // Zet LED2 aan
                console.log("Lampje 2 is AAN gezet om 3 uur of later.");
            } else {
                console.log("Lampje 2 stond al aan.");
            }
        });
    }
}

setInterval(checkTimeAndSetLampje, 1000);

