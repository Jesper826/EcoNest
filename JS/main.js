<<<<<<< Updated upstream
=======
function updateTime() {
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    var t_str = hours + ":" + minutes + " ";
    if (hours > 11) {
        t_str += "PM";
    } else {
        t_str += "AM";
    }
    document.getElementById('TextShadow').innerHTML = t_str;
}
setInterval(updateTime, 1000);

updateTime(); // calling the function for the first time so that it does not show the default time


const myChart = new Chart("myChart", {
    type: "scatter",
    data: {},
    options: {}
});

const yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];
const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
            borderColor: "red",
            fill: false
        }, {
            data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
            borderColor: "green",
            fill: false
        }, {
            data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
            borderColor: "blue",
            fill: false
        }]
    },
    options: {
        legend: { display: false }
    }
});

>>>>>>> Stashed changes
