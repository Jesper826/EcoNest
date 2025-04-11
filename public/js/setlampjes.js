const slider1 = document.getElementById("sliderLed1");

if (slider1 != null) {
    GetData().then(data => {
        console.log("Huidige status LED1:", data.lights.LED1);
        slider1.checked = data.lights.LED1;
    });

    slider1.addEventListener("change", () => {
        const isOn = slider1.checked; 
        SetLampje(1, isOn); 
        console.log(`Lampje LED1 is ${isOn ? "AAN" : "UIT"} gezet.`);
    });
}

setInterval(1000);