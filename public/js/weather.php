<?php
$apiKey = "01945d06a89e4a2cba1120907250403"; // Your API key
$city = "Amsterdam";
$days = 7; // Number of forecast days

//Corrected URL to fetch forecast data for 7 days
$url = "https://api.weatherapi.com/v1/current.json?key=01945d06a89e4a2cba1120907250403&q=Amsterdam&aqi=yes" . $apiKey . "&q=" . $city . "&days=" . $days;


$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERAGENT, "MyWeatherApp/1.0");
$response = curl_exec($ch);
curl_close($ch);

header('Content-Type: application/json');
echo $response;
?>
