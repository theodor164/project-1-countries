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
            data: { currency: moreInfo.geonames[0].currencyCode },
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

                              $("#capitalCity").html(
                                moreInfo.geonames[0].capital
                              );
                              $("#continent").html(
                                locationInfo.results[0].components.continent
                              );
                              $("#languages").html(
                                moreInfo.geonames[0].languages
                              );
                              $("#currency").html(
                                moreInfo.geonames[0].currencyCode
                              );
                              $("#isoAlpha2").html(
                                moreInfo.geonames[0].countryCode
                              );
                              $("#isoAlpha3").html(
                                moreInfo.geonames[0].isoAlpha3
                              );
                              $("#population").html(
                                numeral(moreInfo.geonames[0].population).format(
                                  "0,0"
                                )
                              );
                              $("#areaInSqKm").html(
                                numeral(moreInfo.geonames[0].areaInSqKm).format(
                                  "0,0"
                                )
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
                              $("#exampleModal2").modal("show");

                              $("#fromCurrency").html(
                                `From ${moreInfo.geonames[0].currencyCode}`
                              );

                              const selectElement =
                                document.getElementById("exchangeRate");
                                selectElement.innerHTML='';
                              for (const currencyCode in exchangeInfo.data) {
                                const currencyData =
                                  exchangeInfo.data[currencyCode];
                                const option = document.createElement("option");
                                option.value = currencyData.value;
                                option.text = currencyData.code;
                                selectElement.appendChild(option);
                              }

                              function calcResult() {
                                $("#toAmount").val(
                                  numeral(
                                    $("#fromAmount").val() *
                                      $("#exchangeRate").val()
                                  ).format("0,0.00")
                                );
                              }

                              $("#fromAmount").on("keyup", function () {
                                calcResult();
                              });

                              $("#fromAmount").on("change", function () {
                                calcResult();
                              });

                              $("#exchangeRate").on("change", function () {
                                calcResult();
                              });

                              $("#exampleModal").on(
                                "show.bs.modal",
                                function () {
                                  calcResult();
                                }
                              );
                            }
                          ).addTo(map);

                          button3 = L.easyButton(
                            '<i class="fa-brands fa-wikipedia-w"></i>',
                            function (btn, map) {
                              $("#wikiModal").modal("show");
                              $("#wikipediaLink").attr("href", `http://${wikipediaLinks.geonames[0].wikipediaUrl}`)
                            }
                          ).addTo(map);
                          button4 = L.easyButton(
                            '<i class="fa-solid fa-newspaper"></i>',
                            function (btn, map) {
                              $("#exampleModal").modal("show");

                              $("#first-image").attr(
                                "src",
                                newsLinks.results[0].image_url
                              );
                              $("#first-link").attr(
                                "href",
                                newsLinks.results[0].link
                              );
                              $("#first-link").html(newsLinks.results[0].title);
                              $("#first-source").html(
                                newsLinks.results[0].source_id
                              );

                              $("#second-image").attr(
                                "src",
                                newsLinks.results[1].image_url
                              );
                              $("#second-link").attr(
                                "href",
                                newsLinks.results[1].link
                              );
                              $("#second-link").html(
                                newsLinks.results[1].title
                              );
                              $("#second-source").html(
                                newsLinks.results[1].source_id
                              );

                              $("#third-image").attr(
                                "src",
                                newsLinks.results[2].image_url
                              );
                              $("#third-link").attr(
                                "href",
                                newsLinks.results[2].link
                              );
                              $("#third-link").html(newsLinks.results[2].title);
                              $("#third-source").html(
                                newsLinks.results[2].source_id
                              );

                              $("#fourth-image").attr(
                                "src",
                                newsLinks.results[3].image_url
                              );
                              $("#fourth-link").attr(
                                "href",
                                newsLinks.results[3].link
                              );
                              $("#fourth-link").html(
                                newsLinks.results[3].title
                              );
                              $("#fourth-source").html(
                                newsLinks.results[3].source_id
                              );
                            }
                          ).addTo(map);
                          button5 = L.easyButton(
                            '<i class="fa-solid fa-cloud"></i>',
                            function (btn, map) {
                              // Get references to the modal and modal content

                              $("#weatherModal").modal("show");

                              $("#weatherModalLabel").html(
                                moreInfo.geonames[0].capital +
                                  ", " +
                                  locationInfo.results[0].components.country
                              );

                              $("#todayConditions").html(
                                weatherForecastCity.forecast.forecastday[0].day
                                  .condition.text
                              );

                              $("#todayIcon").attr(
                                "src",
                                weatherForecastCity.forecast.forecastday[0].day
                                  .condition.icon
                              );

                              $("#todayMaxTemp").html(
                                numeral(weatherForecastCity.forecast.forecastday[0].day
                                  .maxtemp_c).format('0')
                              );

                              $("#todayMinTemp").html(
                                numeral(weatherForecastCity.forecast.forecastday[0].day
                                  .mintemp_c).format('0')
                              );

                              $("#day1Date").text(
                                moment(
                                  weatherForecastCity.forecast.forecastday[1]
                                    .date,
                                  "YYYY-MM-DD"
                                ).format("ddd Do")
                              );
                              $("#day1Icon").attr(
                                "src",
                                weatherForecastCity.forecast.forecastday[1].day
                                  .condition.icon
                              );
                              $("#day1MinTemp").text(
                                numeral(weatherForecastCity.forecast.forecastday[1].day
                                  .mintemp_c).format('0')
                              );
                              $("#day1MaxTemp").text(
                                numeral(weatherForecastCity.forecast.forecastday[1].day
                                  .maxtemp_c).format('0')
                              );

                              $("#day2Date").text(
                                moment(
                                  weatherForecastCity.forecast.forecastday[2]
                                    .date,
                                  "YYYY-MM-DD"
                                ).format("ddd Do")
                              );
                              $("#day2Icon").attr(
                                "src",
                                weatherForecastCity.forecast.forecastday[2].day
                                  .condition.icon
                              );
                              $("#day2MinTemp").text(
                                numeral(weatherForecastCity.forecast.forecastday[2].day
                                  .mintemp_c).format('0')
                              );
                              $("#day2MaxTemp").text(
                                numeral(weatherForecastCity.forecast.forecastday[2].day
                                  .maxtemp_c).format('0')
                              );

                              $("#lastUpdated").text(
                                moment(
                                  weatherForecastCity.current.last_updated,
                                  "YYYY-MM-DD"
                                ).format("HH:mm, Do MMM")
                              );
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
