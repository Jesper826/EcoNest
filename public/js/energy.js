const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November"];


new Chart("energy", {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: 'Energy Consumption',
            data: [65, 59, 80, 81, 56, 55, 40, 50, 74, 35, 56],
            fill: false,
            borderColor: 'darkblue',
            tension: 0.1
        }]
    }
});