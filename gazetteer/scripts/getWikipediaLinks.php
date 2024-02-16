<?php


$city = $_GET['city'];


$apiUrl = "http://api.geonames.org/wikipediaSearchJSON?q={$city}&maxRows=5&username=theodor164";


$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>