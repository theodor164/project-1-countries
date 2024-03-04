<?php
// Include data
$jsonData = file_get_contents(__DIR__ . '/countryBorders.geo.json');

// Decode JSON data
$data = json_decode($jsonData, true);

// Extract country features
$countries = $data['features'];

// Prepare an array to hold country data
$countryData = [];

// Iterate through countries and extract necessary information
foreach ($countries as $country) {
    $name = $country['properties']['name'];
    $iso_a2 = $country['properties']['iso_a2'];
    $countryData[] = [
        'name' => $name,
        'iso_a2' => $iso_a2
    ];
}

// Output JSON
header('Content-Type: application/json');
echo json_encode($countryData);
?>
