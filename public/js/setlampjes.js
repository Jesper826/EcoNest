const slider1 = document.getElementById("sliderLed1");
if (slider1 != null){
    GetData().then(data => {
        console.log(data.lights.LED1);
        slider1.checked = data.lights.LED1;
    });
    
    
    SetLampje(1, true);
    
}