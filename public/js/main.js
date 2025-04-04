/// clock left corner
let student = 38406;
function updateTime() {
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    var t_str = hours + ":" + minutes + " ";
    document.getElementById('TextShadow').innerHTML = t_str;
}
setInterval(updateTime, 1000);

updateTime(); // calling the function for the first time so that it does not show the default time


function SetLampje(ledNum, inOn) {
    url = ("https://"+student+".hosts2.ma-cloud.nl/EcoNest/api/post.php?led" + ledNum + "=" + inOn);
    console.log(url);
    fetch(url);
}

function GetData() {
    return fetch("https://"+student+".hosts2.ma-cloud.nl/EcoNest/api/post.php")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}

// Usage:
GetData().then(data => {
    console.log("JSON data:", data);
});

// SetLampje(1, false);