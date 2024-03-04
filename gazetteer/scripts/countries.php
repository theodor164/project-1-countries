<?php
// Include data
$jsonData = file_get_contents(__DIR__ . '/countryBorders.geo.json');

// Decode JSON data
$data = json_decode($jsonData, true);

// Extract country features
$countries = $data['features'];

// Function to generate options for the select element
function generateOptions($countries) {

    // Sort countries alphabetically by name
    usort($countries, function($a, $b) {
        return strcmp($a['properties']['name'], $b['properties']['name']);
    });

    $options = '';

    foreach ($countries as $country) {
        $name = $country['properties']['name'];
        $iso_a2 = $country['properties']['iso_a2'];
        $options .= "<option value=\"$iso_a2\" class='text-center'>$name</option>";
    }

    return $options;
}

//Render the select element
echo '<select id="countrySelect" class="form-select">';
echo generateOptions($countries);
echo '</select>';
?>