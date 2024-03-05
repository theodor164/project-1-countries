var selectedPinsCluster = L.markerClusterGroup();
// Define separate marker cluster groups for different categories of markers
var airportLayer = L.markerClusterGroup({
  polygonOptions: {
    fillColor: "#fff",
    color: "#000",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5,
  },
}).addTo(map);
var cityLayer = L.markerClusterGroup({
  polygonOptions: {
    fillColor: "#fff",
    color: "#000",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5,
  },
}).addTo(map);
var universityLayer = L.markerClusterGroup({
  polygonOptions: {
    fillColor: "#fff",
    color: "#000",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5,
  },
}).addTo(map);
var stadiumLayer = L.markerClusterGroup({
  polygonOptions: {
    fillColor: "#fff",
    color: "#000",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5,
  },
}).addTo(map);

// Add marker cluster groups to the Layer Control
layerControl.addOverlay(airportLayer, "Airports");
layerControl.addOverlay(cityLayer, "Cities");
layerControl.addOverlay(universityLayer, "Universities");
layerControl.addOverlay(stadiumLayer, "Stadiums");

// Set IDs for the checkboxes
$(
  "#map > div.leaflet-control-container > div.leaflet-top.leaflet-right > div > section > div.leaflet-control-layers-overlays > label:nth-child(1) > span > input"
).attr("id", "airportsCheckbox");
$(
  "#map > div.leaflet-control-container > div.leaflet-top.leaflet-right > div > section > div.leaflet-control-layers-overlays > label:nth-child(2) > span > input"
).attr("id", "citiesCheckbox");
$(
  "#map > div.leaflet-control-container > div.leaflet-top.leaflet-right > div > section > div.leaflet-control-layers-overlays > label:nth-child(3) > span > input"
).attr("id", "universitiesCheckbox");
$(
  "#map > div.leaflet-control-container > div.leaflet-top.leaflet-right > div > section > div.leaflet-control-layers-overlays > label:nth-child(4) > span > input"
).attr("id", "stadiumsCheckbox");

// Event listener for the checkboxes
$(document).ready(function () {
  $("#airportsCheckbox").change(function () {
    handleCheckboxChange(
      airportLayer,
      "./scripts/getCountryAirports.php",
      "#airportsCheckbox",
      "Airports"
    );
  });

  $("#citiesCheckbox").change(function () {
    handleCheckboxChange(
      cityLayer,
      "./scripts/getCountryCities.php",
      "#citiesCheckbox",
      "Cities"
    );
  });

  $("#universitiesCheckbox").change(function () {
    handleCheckboxChange(
      universityLayer,
      "./scripts/getCountryUniversities.php",
      "#universitiesCheckbox",
      "Universities"
    );
  });

  $("#stadiumsCheckbox").change(function () {
    handleCheckboxChange(
      stadiumLayer,
      "./scripts/getCountryStadiums.php",
      "#stadiumsCheckbox",
      "Stadiums"
    );
  });

  $("#countrySelect").change(function () {
    handleCountrySelection();
  });
});

// Function to handle checkbox change
function handleCheckboxChange(layer, scriptUrl, id, layerName) {
  var isChecked = $(id).is(":checked");
  if (isChecked) {
    showToast(`Getting ${layerName} markers`, 1500, false);
    // Call the function to fetch and display markers
    handleCountrySelection2(layer, scriptUrl, layerName);
  } else {
    // If checkbox is unchecked, remove markers
    layer.clearLayers();
  }
}

function handleCountrySelection() {
  var selectedCountryFull = $("#countrySelect option:selected").html();
  fetchLocationInformation(selectedCountryFull);

  handleCheckboxChange(
    airportLayer,
    "./scripts/getCountryAirports.php",
    "#airportsCheckbox",
    "Airports"
  );
  handleCheckboxChange(
    cityLayer,
    "./scripts/getCountryCities.php",
    "#citiesCheckbox",
    "Cities"
  );
  handleCheckboxChange(
    universityLayer,
    "./scripts/getCountryUniversities.php",
    "#universitiesCheckbox",
    "Universities"
  );
  handleCheckboxChange(
    stadiumLayer,
    "./scripts/getCountryStadiums.php",
    "#stadiumsCheckbox",
    "Stadiums"
  );
}

// Function to handle country selection
function handleCountrySelection2(layer, scriptUrl, layerName) {
  var selectedCountry = $("#countrySelect").val();
  var selectedCountryFull = $("#countrySelect option:selected").html();
  // removeAllMarkers();
  // Send AJAX request to get marker information based on the selected country
  $.ajax({
    url: scriptUrl,
    type: "GET",
    data: {
      country: selectedCountry,
      countryFull: selectedCountryFull, // Pass selectedCountryFull as parameter
    },
    success: function (response) {
      if (!response) {
        console.error("Empty response received.");
      }
      var markerInfo = JSON.parse(response);
      // Add or remove markers based on the checkbox state
      addMarkers(layer, markerInfo, layerName);
    },
    error: function (xhr, status, error) {
      console.error("Error fetching marker information:", error);
    },
  });
}

// Function to add markers to the layer
function addMarkers(layer, markerInfo, layerName) {
  layer.clearLayers(); // Clear existing markers
  // Add markers for the location information
  markerInfo.geonames.forEach(function (location) {
    var marker = L.marker([location.lat, location.lng], {
      icon: getMarkerIcon(layerName),
    });
    layerName === "Cities"
      ? marker.bindTooltip(
          "<div class='col text-center'><strong>" +
            location.name +
            "</strong><br><i>(" +
            numeral(location.population).format("0,0") +
            ")</i></div>",
          { direction: "top", sticky: true }
        )
      : marker.bindTooltip(location.name, { direction: "top", sticky: true });
    marker.bindPopup(`Location: ${location.name}`);
    layer.addLayer(marker);
  });

  // Add the layer to the map
  map.addLayer(layer);
}

// Function to get marker icon based on the category
function getMarkerIcon(category) {
  // Customize icon based on category
  if (category === "Airports") {
    return airportMarker;
  } else if (category === "Cities") {
    return cityMarker;
  } else if (category === "Universities") {
    return universityMarker;
  } else if (category === "Stadiums") {
    return stadiumMarker;
  }
}

// Creates a red marker with the coffee icon
var airportMarker = L.ExtraMarkers.icon({
  prefix: "fa",
  icon: "fa-plane",
  iconColor: "black",
  markerColor: "white",
  shape: "square",
});

// Create other marker icons for different categories as needed
var cityMarker = L.ExtraMarkers.icon({
  prefix: "fa",
  icon: "fa-city",
  markerColor: "green",
  shape: "square",
});

var universityMarker = L.ExtraMarkers.icon({
  icon: "fa-solid fa-university",
  iconColor: "orange",
  shape: "square",
  prefix: "fa",
});

var stadiumMarker = L.ExtraMarkers.icon({
  icon: "fas fa-futbol",
  iconColor: "purple",
  shape: "square",
  prefix: "fa",
  markerColor: "yellow",
});

var greenIcon = L.icon({
  iconUrl: "./marker-icons/leaf-green.png",
  shadowUrl: "./marker-icons/leaf-shadow.png",

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

var redIcon = L.icon({
  iconUrl: "./marker-icons/leaf-red.png",
  shadowUrl: "./marker-icons/leaf-shadow.png",

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

var orangeIcon = L.icon({
  iconUrl: "./marker-icons/leaf-orange.png",
  shadowUrl: "./marker-icons/leaf-shadow.png",

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

var button1, button2, button3, button4, button5;

const leafs = [greenIcon, redIcon, orangeIcon];
let leafIndex = 0;

// Add an onchange event listener to the country selection input

function onMapClick(e) {
  let marker = L.marker([e.latlng.lat, e.latlng.lng], {
    icon: leafs[leafIndex % 3],
  });
  marker.bindPopup(`lat: ${e.latlng.lat}, lng: ${e.latlng.lng}`);
  selectedPinsCluster.addLayer(marker);
  map.addLayer(selectedPinsCluster);

  leafIndex++;
}

map.on("click", onMapClick);

// Function to remove all markers
function removeAllMarkers() {
  selectedPinsCluster.clearLayers();
  airportLayer.clearLayers();
  cityLayer.clearLayers();
  universityLayer.clearLayers();
  stadiumLayer.clearLayers();
}

// Create an easyButton to remove all markers
L.easyButton('<i class="fas fa-trash-alt"></i>', function (btn, map) {
  removeAllMarkers();
}).addTo(map);

function fetchLocationInformation(country) {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  document.querySelector("#info").innerHTML = `<div id="loader"></div>`;
  document.getElementById("loader").style.display = "block";
  $.ajax({
    url: "./scripts/getLocationInfoCountry.php",
    type: "GET",
    data: { country: country },
    success: function (response) {
      if (!response) {
        console.error("Empty response received.");
      }
      try {
        var locationInfo = JSON.parse(response);
      } catch (error) {
        console.error("Error parsing JSON response:", error);
      }
      $.ajax({
        url: "./scripts/getMoreInfo.php",
        type: "GET",
        data: {
          country: locationInfo.results[0].components["ISO_3166-1_alpha-2"],
        },
        success: function (response) {
          if (!response) {
            console.error("Empty response received.");
          }
          try {
            var moreInfo = JSON.parse(response);
          } catch (error) {
            console.error("Error parsing JSON response:", error);
          }
          $.ajax({
            url: "./scripts/getCurrentExchangeRate.php",
            type: "GET",
            success: function (response) {
              if (!response) {
                console.error("Empty response received.");
              }
              try {
                var exchangeInfo = JSON.parse(response);
              } catch (error) {
                console.error("Error parsing JSON response:", error);
              }
              $.ajax({
                url: "./scripts/getWikipediaLinks.php",
                data: { city: locationInfo.results[0].components.country },
                success: function (response) {
                  if (!response) {
                    console.error("Empty response received.");
                  }
                  try {
                    var wikipediaLinks = JSON.parse(response);
                  } catch (error) {
                    console.error("Error parsing JSON response:", error);
                  }
                  $.ajax({
                    url: "./scripts/getNews.php",
                    data: {
                      country: locationInfo.results[0].components.state
                        ? locationInfo.results[0].components.state
                        : locationInfo.results[0].components.country,
                    },
                    success: function (response) {
                      if (!response) {
                        console.error("Empty response received.");
                      }
                      try {
                        var newsLinks = JSON.parse(response);
                      } catch (error) {
                        console.error("Error parsing JSON response:", error);
                      }
                      $.ajax({
                        url: "./scripts/getWeatherForecastCity.php",
                        type: "GET",
                        data: { city: moreInfo.geonames[0].capital },
                        success: function (response) {
                          if (!response) {
                            console.error("Empty response received.");
                          }
                          try {
                            var weatherForecastCity = JSON.parse(response);
                          } catch (error) {
                            console.error(
                              "Error parsing JSON response:",
                              error
                            );
                          }
                          if (button1) button1.remove();
                          if (button2) button2.remove();
                          if (button3) button3.remove();
                          if (button4) button4.remove();
                          if (button5) button5.remove();
                          document.getElementById("loader").style.display =
                            "none";
                          modal.style.display = "none";
                          button1 = L.easyButton(
                            '<i class="fa-solid fa-circle-info"></i>',
                            function (btn, map) {
                              $("#countryInfoModal").modal("show");

                              $("#capitalCity").html(moreInfo.geonames[0].capital);
                              $("#continent").html(locationInfo.results[0].components.continent);
                              $("#languages").html(moreInfo.geonames[0].languages);
                              $("#currency").html(moreInfo.geonames[0].currencyCode);
                              $("#isoAlpha2").html(moreInfo.geonames[0].countryCode);
                              $("#isoAlpha3").html(moreInfo.geonames[0].isoAlpha3);
                              $("#population").html(
                                numeral(moreInfo.geonames[0].population).format("0,0")
                              );
                              $("#areaInSqKm").html(
                                numeral(moreInfo.geonames[0].areaInSqKm).format("0,0")
                              );
                              $("#postalCodeFormat").html(
                                moreInfo.geonames[0].postalCodeFormat == ""
                                  ? "n/a"
                                  : moreInfo.geonames[0].postalCodeFormat
                              );

                              $("#pre-load").addClass("fadeOut");
                            }
                          ).addTo(map);
                          button2 = L.easyButton(
                            '<i class="fas fa-dollar-sign"></i>',
                            function (btn, map) {
                              var modal = $("#myModal3");
                              var modalContent = $("#modal-content3");

                              var exchangeContent = `
          <p class="color-blue center-the-text">Currency Calculator</p>
          <div class="row">
          <div class="col-md-6">
          <label for="currencyInput">Currency:</label>
          <input type="text" id="currencyInput" class="form-control" placeholder="Enter currency">
          ${locationInfo.results[0].annotations.currency.iso_code}
          </div>
          <div class="col-md-6">
          <label for="exchangeResult">Exchange Result:</label>
          <input type="text" id="exchangeResult" class="form-control" readonly>
          USD
          </div>
          </div>
          `;
                              // Set modal content
                              modalContent.html(exchangeContent);
                              $("#currencyInput").on("input", function () {
                                // Get the value entered in the currencyInput field
                                var currencyValue = $(this).val();

                                // Perform your calculation or fetch exchange rate here
                                // For demonstration, let's assume a simple calculation
                                var exchangeRate =
                                  1 /
                                  exchangeInfo.rates[
                                    locationInfo.results[0].annotations.currency
                                      .iso_code
                                  ]; // Example exchange rate
                                var result = currencyValue * exchangeRate; // Calculate the result
                                result = numeral(result).format("0,0.0000"); // Calculate the result

                                // Set the value of the exchangeResult input field to the calculated result
                                $("#exchangeResult").val(result);
                              });
                              // Display the modal
                              modal.css("display", "block");
                            }
                          ).addTo(map);

                          button3 = L.easyButton(
                            '<i class="fa-brands fa-wikipedia-w"></i>',
                            function (btn, map) {
                              var modal = $("#myModal5");
                              var modalContent = $("#modal-content5");
                              var content = `
                                <p id="useful-info" class="center-the-text color-blue">Useful Info:</p>
            <p><a href="http://${wikipediaLinks.geonames[0].wikipediaUrl}">${wikipediaLinks.geonames[0].title}</a></p>
            <p><a href="http://${wikipediaLinks.geonames[1].wikipediaUrl}">${wikipediaLinks.geonames[1].title}</a></p>
            <p><a href="http://${wikipediaLinks.geonames[2].wikipediaUrl}">${wikipediaLinks.geonames[2].title}</a></p>
            <p><a href="http://${wikipediaLinks.geonames[3].wikipediaUrl}">${wikipediaLinks.geonames[3].title}</a></p>
            <p><a href="http://${wikipediaLinks.geonames[4].wikipediaUrl}">${wikipediaLinks.geonames[4].title}</a></p>
            `;

                              modalContent.html(content);
                              modal.css("display", "block");
                            }
                          ).addTo(map);
                          button4 = L.easyButton(
                            '<i class="fa-solid fa-newspaper"></i>',
                            function (btn, map) {
                              // Get references to the modal and modal content
                              var modal = $("#myModal6");
                              var modalContent = $("#modal-content6");

                              // Populate modal content with location information
                              var content = `
                              <p class="center-the-text color-blue">News:</p>
      <p><a href="${newsLinks.results[0].link}">${newsLinks.results[0].title}</a></p>
      <p><a href="${newsLinks.results[1].link}">${newsLinks.results[1].title}</a></p>
      <p><a href="${newsLinks.results[2].link}">${newsLinks.results[2].title}</a></p>
      <p><a href="${newsLinks.results[3].link}">${newsLinks.results[3].title}</a></p>
      <p><a href="${newsLinks.results[4].link}">${newsLinks.results[4].title}</a></p>
      `;
                              // Set modal content
                              modalContent.html(content);

                              // Display the modal
                              modal.css("display", "block");
                            }
                          ).addTo(map);
                          button5 = L.easyButton(
                            '<i class="fa-solid fa-cloud"></i>',
                            function (btn, map) {
                              // Get references to the modal and modal content
                              var modal = $("#myModal4");
                              var modalContent = $("#modal-content4");
                              var date1 = new Date(
                                weatherForecastCity.forecast.forecastday[1].date
                              );
                              var dayOfWeek1 = date1.getDay();
                              var days = [
                                "Sunday",
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                              ];
                              var dayOfWeekString1 = days[dayOfWeek1];
                              var date2 = new Date(
                                weatherForecastCity.forecast.forecastday[2].date
                              );
                              var dayOfWeek2 = date2.getDay();
                              var dayOfWeekString2 = days[dayOfWeek2];

                              var weatherContent = `
                              <p class="color-blue center-the-text">Weather forecast</p>
                              <div class="row">
                                <div class="col-md-4">
                                <div>${moreInfo.geonames[0].capital}, ${
                                locationInfo.results[0].components.country
                              }</div>
                                </div>
                                <div class="col-md-4" id="today-forecast">
                                <div><img src="http:${
                                  weatherForecastCity.forecast.forecastday[0]
                                    .day.condition.icon
                                }"><span style="font-size: 2.5rem">${numeral(
                                weatherForecastCity.forecast.forecastday[0].day
                                  .maxtemp_c
                              ).format("0,0.0")}</span>°C</div>
                                <div class="col-md-12">${
                                  weatherForecastCity.forecast.forecastday[0]
                                    .day.condition.text
                                }</div>
                                </div>
                                <div class="col-md-4">
                                <div><p>Humidity: ${numeral(
                                  weatherForecastCity.forecast.forecastday[0]
                                    .day.avghumidity
                                ).format("0,0.0")}%</p><p>Wind: ${numeral(
                                weatherForecastCity.forecast.forecastday[0].day
                                  .maxwind_kph
                              ).format("0,0.0")} kph</p></div>
                                </div>
                                </div> 
                                <div class="row">
                                <div class="col-md-6 row" id="tomorrow">
                                <div class="col-md-6">
                                <p>${dayOfWeekString1}:</p><p>${numeral(
                                weatherForecastCity.forecast.forecastday[1].day
                                  .maxtemp_c
                              ).format("0,0.0")}°C</p>
                                </div>
                                <div class="col-md-6">
                                <img src="http:${
                                  weatherForecastCity.forecast.forecastday[1]
                                    .day.condition.icon
                                }">
                                </div>
                                </div> 
                                <div class="col-md-6 row">
                                  <div class="col-md-6">
                                  <p>${dayOfWeekString2}:</p><p>${numeral(
                                weatherForecastCity.forecast.forecastday[2].day
                                  .maxtemp_c
                              ).format("0,0.0")}°C</p>
                                  </div>
                                  <div class="col-md-6">
                                  <img src="http:${
                                    weatherForecastCity.forecast.forecastday[2]
                                      .day.condition.icon
                                  }">
                                  </div>
                                  </div> 
                                  </div>
                                  `;

                              modalContent.html(weatherContent);

                              // Display the modal
                              modal.css("display", "block");
                            }
                          ).addTo(map);
                        },
                        error: function (xhr, status, error) {
                          console.error(
                            "Error fetching location info:",
                            status,
                            error
                          );
                        },
                      });
                    },
                    error: function (xhr, status, error) {
                      console.error(
                        "Error fetching location info:",
                        status,
                        error
                      );
                    },
                  });
                },
                error: function (xhr, status, error) {
                  console.error("Error fetching location info:", status, error);
                },
              });
            },
            error: function (xhr, status, error) {
              console.error("Error fetching location info:", status, error);
            },
          });
        },
        error: function (xhr, status, error) {
          console.error("Error fetching location info:", status, error);
        },
      });
    },
    error: function (xhr, status, error) {
      console.error("Error fetching location info:", status, error);
    },
  });
}

// Function to close the modal
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function closeModal2() {
  var modal = document.getElementById("myModal2");
  modal.style.display = "none";
}

function closeModal3() {
  var modal = document.getElementById("myModal3");
  modal.style.display = "none";
}

function closeModal4() {
  var modal = document.getElementById("myModal4");
  modal.style.display = "none";
}

function closeModal5() {
  var modal = document.getElementById("myModal5");
  modal.style.display = "none";
}

function closeModal6() {
  var modal = document.getElementById("myModal6");
  modal.style.display = "none";
}

function showToast(message, duration, close) {
  Toastify({
    text: message,
    duration: duration,
    newWindow: true,
    close: close,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#004687",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

// Function to format numbers using numeral.js
function formatNumber(value) {
  // Use numeral.js to format the value
  return numeral(value).format("0,0");
}
