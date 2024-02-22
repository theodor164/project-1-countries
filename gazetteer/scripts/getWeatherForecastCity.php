<?php

$apiKey = 'e66eee081a7846c2a6a180153240602';

// Get latitude and longitude from the AJAX request
$city = $_GET['city'];

$encodedCity = urlencode($city);


$apiUrl = "http://api.weatherapi.com/v1/forecast.json?key={$apiKey}&q={$encodedCity}&days=3&aqi=no&alerts=no";


$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>