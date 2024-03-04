<?php
// Get the ISO alpha-2 country code from the request
$countryCode = $_GET['countryCode'];

// Include data
$jsonData = file_get_contents(__DIR__ . '/countryBorders.geo.json');

// Decode JSON data
$data = json_decode($jsonData, true);

// Find the selected country in the JSON data
$selectedCountry = null;
foreach ($data['features'] as $country) {
    if ($country['properties']['iso_a2'] === $countryCode) {
        $selectedCountry = $country;
        break;
    }
}

// Return the selected country features as JSON
header('Content-Type: application/json');
echo json_encode($selectedCountry);
?>
