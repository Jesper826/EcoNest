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

updateTime(); // calling the function for the first time so that it does not show the default time


function SetLampje(ledNum, inOn) {
    url = ("https://38734.hosts2.ma-cloud.nl/EcoNest/ma-cloud/post.php?led" + ledNum + "=" + inOn);
    console.log(url);
    fetch(url);
}

function GetData() {
    return fetch("https://38734.hosts2.ma-cloud.nl/EcoNest/ma-cloud/post.php")
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

//SetLampje(1, false);

function SetLampje(ledNum, inOn) {
    const url = `https://38734.hosts2.ma-cloud.nl/EcoNest/ma-cloud/post.php?led${ledNum}=${inOn}`;
    console.log(`Verzoek verzonden naar: ${url}`);
    fetch(url, { method: "POST" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Fout bij het verzenden van het verzoek");
            }
            console.log(`Lampje ${ledNum} is ${inOn ? "AAN" : "UIT"} gezet.`);
        })
        .catch(error => {
            console.error("Fout bij het aanzetten/uitzetten van het lampje:", error);
        });
}


//bram zijn api


fetch('https://v2.jokeapi.dev/joke/Any')
  .then(response => response.json())
  .then(data => {
    let jokeText;
    if (data.type === "single") {
      jokeText = data.joke;
    } else {
      jokeText = `${data.setup} ... ${data.delivery}`;
    }
    document.getElementById('joke').innerText = jokeText;
  })
  .catch(error => {
    console.error('Error fetching joke:', error);
    document.getElementById('joke').innerText = 'Failed to load joke.';
  });
  document.getElementById("newJokeButton").addEventListener("click", () => {
    fetch('https://v2.jokeapi.dev/joke/Any')
        .then(response => response.json())
        .then(data => {
            let jokeText;
            if (data.type === "single") {
                jokeText = data.joke;
            } else {
                jokeText = `${data.setup} ... ${data.delivery}`;
            }
            document.getElementById('joke').innerText = jokeText;
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            document.getElementById('joke').innerText = 'Failed to load joke.';
        });
});