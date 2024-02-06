<?php

$apiKey = '8fc01928d8cf4ffc99b70516409cc86c';

$apiUrl = "https://openexchangerates.org/api/latest.json?app_id={$apiKey}";

$response = file_get_contents($apiUrl);

echo $response;
?>