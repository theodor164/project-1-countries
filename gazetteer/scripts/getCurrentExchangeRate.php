<?php

$currency = $_GET['currency'];

$apiUrl = "https://api.currencyapi.com/v3/latest?apikey=cur_live_LXPd69rBahjJT4x4AXGKrqmJ6TthFof6Kq0Vv1Lw&base_currency={$currency}";

$response = file_get_contents($apiUrl);

// Check if request was successful
if ($response === FALSE) {
  http_response_code(500); // Internal Server Error
  echo json_encode(array('error' => 'Error making request to the API.'));
  exit;
}

echo $response;
?>