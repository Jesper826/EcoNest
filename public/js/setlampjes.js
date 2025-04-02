const slider1 = document.getElementById("sliderLed1");
if (slider1 != null) {
    // Get initial data and set slider state
    GetData().then(data => {
        console.log(data.lights.LED1);
        slider1.checked = data.lights.LED1;
    });
    
    // Set up event listener for slider change
    slider1.addEventListener('change', () => {
        SetLampje(1, slider1.checked);
    });
}