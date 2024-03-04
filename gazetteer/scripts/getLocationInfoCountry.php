<?php
// Check if country parameter is provided
if (!isset($_GET['country'])) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Country parameter is required.'));
    exit;
}

$apiKey = '614ade6b25c54593bf6264956fa5ef43';

$country = $_GET['country'];

// Encode the country parameter
$encodedCountry = urlencode($country);

$apiUrl = "https://api.opencagedata.com/geocode/v1/json?q={$encodedCountry}&key={$apiKey}";

// Make the request to the API
$response = file_get_contents($apiUrl);

// Check if request was successful
if ($response === FALSE) {
    http_response_code(500); // Internal Server Error
    echo json_encode(array('error' => 'Error making request to the API.'));
    exit;
}

// Send the response back to the client
echo $response;
?>
