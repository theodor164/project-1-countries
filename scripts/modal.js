var selectedPinsCluster = L.markerClusterGroup();

function fetchLocationInfo(lat, lng) {
  document.querySelector("#info").innerHTML = `<div id="loader"></div>`;
  document.getElementById("loader").style.display = "block";
  $.ajax({
    url: "./scripts/getLocationInfo.php",
    type: "GET",
    data: { lat: lat, lng: lng },
    success: function (response) {
      // Parse OpenCage API response
      var locationInfo = JSON.parse(response);

      $.ajax({
        url: "./scripts/getCurrentExchangeRate.php",
        type: "GET",
        success: function (response) {
          if (!response) {
            console.error("Empty response received.");
            return;
          }
          var exchangeInfo = JSON.parse(response);

          $.ajax({
            url: "./scripts/getMoreInfo.php",
            type: "GET",
            data: {
              country: locationInfo.results[0].components["ISO_3166-1_alpha-2"],
            },
            success: function (response) {
              if (!response) {
                console.error("Empty response received.");
                return;
              }
              var moreInfo = JSON.parse(response);

              $.ajax({
                url: "./scripts/getWeatherInfo.php",
                type: "GET",
                data: { lat: lat, lng: lng },
                success: function (response) {
                  if (!response) {
                    console.error("Empty response received.");
                    return;
                  }
                  var weatherInfo = JSON.parse(response);

                  $.ajax({
                    url: "./scripts/getWeatherForecast.php",
                    data: { lat: lat, lng: lng },
                    success: function (response) {
                      if (!response) {
                        console.error("Empty response received.");
                        return;
                      }
                      var weatherForecast = JSON.parse(response);

                      $.ajax({
                        url: "./scripts/getWikipediaLinks.php",
                        data: { city: locationInfo.results[0].components.city },
                        success: function (response) {
                          if (!response) {
                            console.error("Empty response received.");
                            return;
                          }
                          var wikipediaLinks = JSON.parse(response);
                          document.getElementById("loader").style.display =
                            "none";
                          displayLocationInfo(
                            locationInfo,
                            exchangeInfo,
                            lat,
                            lng,
                            moreInfo,
                            weatherInfo,
                            weatherForecast,
                            wikipediaLinks
                          );
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

function displayLocationInfo(
  locationInfo,
  exchangeInfo,
  lat,
  lng,
  moreInfo,
  weatherInfo,
  weatherForecast,
  wikipediaLinks
) {
  var infoParagraph = document.querySelector("#info");
  if (wikipediaLinks.geonames[4]) {
    infoParagraph.innerHTML = `
    <p>Latitude: ${lat}</p>
    <p>Longitude: ${lng}</p>
    <p id="location-info" class="color-blue">Location Info:</p>
    <div class="forecastContainer">
      <div>
        <div class="center-the-text color-blue">Weather Forecast:</div>
        <div>Today: Highest: ${
          weatherForecast.forecast.forecastday[0].day.maxtemp_c
        }; Lowest: ${
      weatherForecast.forecast.forecastday[0].day.mintemp_c
    }.</div> 
        <div>Tomorrow: Highest: ${
          weatherForecast.forecast.forecastday[1].day.maxtemp_c
        }; Lowest: ${
      weatherForecast.forecast.forecastday[1].day.mintemp_c
    }.</div> 
        <div>Day After Tomorrow: Highest: ${
          weatherForecast.forecast.forecastday[2].day.maxtemp_c
        }; Lowest: ${
      weatherForecast.forecast.forecastday[2].day.mintemp_c
    }.</div> 
      </div>
    </div>
    <p id="exchange-rate" class="center-the-text color-blue">Exchange Rate</p>
    
    <div class="center-the-text color-blue">Useful Info:</div>
    <p><a href="http://${wikipediaLinks.geonames[0].wikipediaUrl}">${
      wikipediaLinks.geonames[0].title
    }</a></p>
    <p><a href="http://${wikipediaLinks.geonames[1].wikipediaUrl}">${
      wikipediaLinks.geonames[1].title
    }</a></p>
    <p><a href="http://${wikipediaLinks.geonames[2].wikipediaUrl}">${
      wikipediaLinks.geonames[2].title
    }</a></p>
    <p><a href="http://${wikipediaLinks.geonames[3].wikipediaUrl}">${
      wikipediaLinks.geonames[3].title
    }</a></p>
    <p><a href="http://${wikipediaLinks.geonames[4].wikipediaUrl}">${
      wikipediaLinks.geonames[4].title
    }</a></p>
    <div id="loader"></div>
  `;
  } else {
    infoParagraph.innerHTML = `
    <p>Latitude: ${lat}</p>
    <p>Longitude: ${lng}</p>
    <p id="location-info" class="color-blue">Location Info:</p>
    <div class="forecastContainer">
      <div>
        <div class="center-the-text color-blue">Weather Forecast:</div>
        <div>Today: Highest: ${
          weatherForecast.forecast.forecastday[0].day.maxtemp_c
        }; Lowest: ${
      weatherForecast.forecast.forecastday[0].day.mintemp_c
    }.</div> 
        <div>Tomorrow: Highest: ${
          weatherForecast.forecast.forecastday[1].day.maxtemp_c
        }; Lowest: ${
      weatherForecast.forecast.forecastday[1].day.mintemp_c
    }.</div> 
        <div>Day After Tomorrow: Highest: ${
          weatherForecast.forecast.forecastday[2].day.maxtemp_c
        }; Lowest: ${
      weatherForecast.forecast.forecastday[2].day.mintemp_c
    }.</div> 
      </div>
    </div>
    <p id="exchange-rate" class="center-the-text color-blue">Exchange Rate</p>
    `;
  }
  // When the user clicks on the location info link
  $("#location-info").click(function (event) {
    // Prevent default link behavior
    event.preventDefault();
    // Get references to the modal and modal content
    var modal = $("#myModal2");
    var modalContent = $("#modal-content2");

    // Populate modal content with location information
    var locationContent = `
      <p class="color-blue">Location Info:</p>
      <p>Country: ${locationInfo.results[0].components.country} / Capital city: ${moreInfo.geonames[0].capital}</p>
      <p>Population: ${moreInfo.geonames[0].population}</p>
      <p>City: ${locationInfo.results[0].components.city}</p>
      <p>Address: ${locationInfo.results[0].formatted}</p>
      <p>Temperature: ${weatherInfo.weatherObservation.temperature}</p>
      <p>Flag: ${locationInfo.results[0].annotations.flag}</p>
      <p>Currency: ${
        locationInfo.results[0].annotations.currency.name
      }</p>
    `;

    // Set modal content
    modalContent.html(locationContent);

    // Display the modal
    modal.css("display", "block");
    console.log("here");
  });
  $("#exchange-rate").click(function (event) {
    event.preventDefault();
    var modal = $("#myModal3");
    var modalContent = $("#modal-content3");

    var exchangeContent = `
    <p class="color-blue">Currency Calculator</p>
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
    $("#currencyInput").on("input", function() {
      // Get the value entered in the currencyInput field
      var currencyValue = $(this).val();
  
      // Perform your calculation or fetch exchange rate here
      // For demonstration, let's assume a simple calculation
      var exchangeRate = 1/exchangeInfo.rates[locationInfo.results[0].annotations.currency.iso_code]; // Example exchange rate
      var result = currencyValue * exchangeRate; // Calculate the result
  
      // Set the value of the exchangeResult input field to the calculated result
      $("#exchangeResult").val(result);
  });
    // Display the modal
    modal.css("display", "block");
  });
}

function onMapClick(e) {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  let marker = L.marker([e.latlng.lat, e.latlng.lng]);
  marker.bindPopup(`lat: ${e.latlng.lat}, lng: ${e.latlng.lng}`);
  selectedPinsCluster.addLayer(marker);
  map.addLayer(selectedPinsCluster);

  fetchLocationInfo(e.latlng.lat, e.latlng.lng);
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

map.on("click", onMapClick);

// Function to remove all markers
function removeAllMarkers() {
  selectedPinsCluster.clearLayers();
}

// Create an easyButton to remove all markers
L.easyButton('<i class="fas fa-trash-alt"></i>', function (btn, map) {
  removeAllMarkers();
}).addTo(map);
