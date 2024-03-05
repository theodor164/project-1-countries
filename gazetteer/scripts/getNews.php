<?php
// Check if country parameter is provided
if (!isset($_GET['country'])) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Country parameter is required.'));
    exit;
}

$country = $_GET['country'];

// Validate country parameter 
if (empty($country)) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Country parameter cannot be empty.'));
    exit;
}

$apiKey = 'a3588ee4bfe549019eb87165dde8c9a6';

$encodedCountry = urlencode($country);

$apiUrl = "https://newsapi.org/v2/everything?q={$encodedCountry}&from=2024-02-05&sortBy=publishedAt&apiKey={$apiKey}";

// Make the request to the API
$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>
