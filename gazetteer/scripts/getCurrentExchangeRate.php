<?php

$apiKey = '8fc01928d8cf4ffc99b70516409cc86c';

$apiUrl = "https://openexchangerates.org/api/latest.json?app_id={$apiKey}";

$response = file_get_contents($apiUrl);

// Check if request was successful
if ($response === FALSE) {
  http_response_code(500); // Internal Server Error
  echo json_encode(array('error' => 'Error making request to the API.'));
  exit;
}

echo $response;
?>