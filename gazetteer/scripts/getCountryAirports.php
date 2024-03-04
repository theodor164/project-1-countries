<?php
// Check if country parameter is provided
if (!isset($_GET['country'])) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Country parameter is required.'));
    exit;
}

$country = $_GET['country'];

// Validate country parameter 
if (!preg_match('/^[A-Za-z]{2}$/', $country)) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Invalid country code format.'));
    exit;
}

$apiUrl = "http://api.geonames.org/searchJSON?q=Airport&maxRows=30&username=theodor164&country={$country}";

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
