<?php
// Check if country parameter is provided
if (!isset($_GET['country'])) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Country parameter is required.'));
    exit;
}

$country = $_GET['country'];

// Validate country parameter 
// You may check if $country is not empty or validate against a list of valid country names or codes
if (empty($country)) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Country parameter cannot be empty.'));
    exit;
}

$apiKey = 'pub_382520a456068cc229e49b390250303080122';

$encodedCountry = urlencode($country);

$apiUrl = "https://newsdata.io/api/1/news?apikey={$apiKey}&q={$encodedCountry}";

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
