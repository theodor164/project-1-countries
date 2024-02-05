<?php
// Include data
$jsonData = file_get_contents(__DIR__ . '/countryBorders.geo.json');

// Decode JSON data
$data = json_decode($jsonData, true);

// Extract country features
$countries = $data['features'];

// Function to generate options for the select element
function generateOptions($countries) {
    $options = '';

    foreach ($countries as $country) {
        $name = $country['properties']['name'];
        $iso_a2 = $country['properties']['iso_a2'];
        $options .= "<option value=\"$iso_a2\">$name</option>";
    }

    return $options;
}

//Render the select element
echo '<select>';
echo generateOptions($countries);
echo '</select>';
?>