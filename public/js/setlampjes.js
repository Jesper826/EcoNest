const slider1 = document.getElementById("lamp--sliderLed1");
const img1 = document.getElementById("lamp--image")

if (slider1 != null) {
    GetData().then(data => {
        console.log("Huidige status LED1:", data.lights.LED1);
        slider1.checked = data.lights.LED1;
        img1.src = !data.lights.LED1 ? "images/lampoff.png" : "images/lamponon.png";
    });

    slider1.addEventListener("change", () => {
        const isOn = slider1.checked; 
        SetLampje(1, isOn); 
        console.log(`Lampje LED1 is ${isOn ? "AAN" : "UIT"} gezet.`);
        img1.src = !isOn ? "images/lampoff.png" : "images/lamponon.png";
        console.log(!isOn ? "images/lampoff.png" : "images/lamponon.png");
    });
}

setInterval(1000);