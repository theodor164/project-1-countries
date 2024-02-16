<?php

// Get latitude and longitude from the AJAX request
$country = $_GET['country'];
$apiKey = 'pub_382520a456068cc229e49b390250303080122';

// Encode the country name
$encodedCountry = urlencode($country);


$apiUrl = "https://newsdata.io/api/1/news?apikey={$apiKey}&q={$encodedCountry}";


$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>