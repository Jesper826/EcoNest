/// clock left corner
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

// calling the function for the first time so that it does not show the default time
updateTime();
